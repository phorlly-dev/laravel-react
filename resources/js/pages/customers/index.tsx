import { fetchCustomers, setSearch } from '@/hooks/customers.slice';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Customer } from '@/types/customer';
import { Head } from '@inertiajs/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Customers', href: route('customer.list') }];

const CustomerList = () => {
    const dispatch = useAppDispatch();
    const { items, total, search, loading, error } = useAppSelector((s) => s.customers);

    const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    // first load + whenever search changes (debounced)
    useEffect(() => {
        const t = setTimeout(() => dispatch(fetchCustomers({ search })), 250);
        return () => clearTimeout(t);
    }, [dispatch, search]);

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilters((prev) => ({ ...prev, global: { ...prev.global, value } }));
        setGlobalFilterValue(value);
        dispatch(setSearch(value));
    };

    const getSeverity = (status: string) => {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;
        }
    };

    const statusBody = (rowData: Customer) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const activityBody = (rowData: Customer) => {
        return <ProgressBar value={rowData.activity} showValue={false} style={{ height: '6px' }}></ProgressBar>;
    };

    const agentBody = (rowData: Customer) => {
        const representative = rowData.representative;

        return (
            <div className="align-items-center flex gap-2">
                <img alt={representative.name} src={representative.image} width="32" className="rounded-full" />
                <span>{representative.name}</span>
            </div>
        );
    };

    const balanceBody = (rowData: Customer) => {
        const value = Number(rowData.balance); // make sure it's a number
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const header = (
        <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="m-0"> Customers </h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </IconField>
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="card">
                <DataTable
                    value={items}
                    loading={loading}
                    header={header}
                    paginator
                    rows={10}
                    rowsPerPageOptions={[10, 25, 50]}
                    dataKey="id"
                    selectionMode="checkbox"
                    selection={selectedCustomers}
                    onSelectionChange={(e) => setSelectedCustomers(e.value as Customer[])}
                    filters={filters}
                    globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status', 'date']}
                    emptyMessage={error || 'No customers found.'}
                >
                    {/* show as index */}
                    <Column header="#" body={(data, options) => options.rowIndex + 1} />
                    <Column field="name" header="Name" sortable />
                    <Column field="country.name" header="Country" sortable />
                    <Column header="Agent" sortable body={agentBody} />
                    <Column field="date" header="Date" sortable dataType="date" />
                    <Column field="balance" header="Balance" sortable dataType="numeric" body={balanceBody} />
                    <Column field="status" header="Status" sortable body={statusBody} />
                    <Column field="activity" header="Activity" sortable body={activityBody} />
                </DataTable>
            </div>
        </AppLayout>
    );
};

export default CustomerList;
