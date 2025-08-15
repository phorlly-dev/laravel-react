import { useEffect } from 'react';

import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/ui/my-data-table';
import {
    customerActions,
    fetchCustomers,
} from '@/hooks/customers-slice';
import {
    useAppDispatch,
    useAppSelector,
} from '@/hooks/hooks';
import AppLayout from '@/layouts/app-layout';
import {
    currency,
    date,
} from '@/lib';
import { Customer } from '@/types/customer';
import { Head } from '@inertiajs/react';

const CustomerList = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.customers);
    const { setPage, setPerPage, setSearch, setSort } = customerActions;

    useEffect(() => {
        dispatch(fetchCustomers({
            page: state.page,
            perPage: state.perPage,
            search: state.search,
            sortField: state.sortField,
            sortOrder: state.sortOrder
        }));
    }, [dispatch, state.page, state.perPage, state.search, state.sortField, state.sortOrder, fetchCustomers]);

    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
    };

    const handlePerPageChange = (newPerPage: string) => {
        dispatch(setPerPage(Number(newPerPage)));
    };

    const handleSort = (field: any) => {
        const order = state.sortField === field && state.sortOrder === 'asc' ? 'desc' : 'asc';
        dispatch(setSort({ field, order }));
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(event.target.value));
    };


    const columns = [
        // ... same column definitions as before
        { key: 'id', title: '#', sortable: true },
        { key: 'name', title: 'Name', sortable: true },
        { key: 'country', title: 'Country', sortable: false, render: (item: Customer) => item.country.name },
        { key: 'representative', title: 'Agent', sortable: false, render: (item: Customer) => item.representative.name },
        { key: 'company', title: 'Company', sortable: true },
        { key: 'date', title: 'Date', sortable: true, render: (item: Customer) => date(item.date) },
        { key: 'status', title: 'Status', sortable: true },
        { key: 'activity', title: 'Activity', sortable: true },
        { key: 'balance', title: 'Balance', sortable: true, render: (item: Customer) => currency(item.balance) },
    ];

    return (
        <AppLayout breadcrumbs={[{ title: 'Customers', href: '/customers' }]}>
            <Head>
                <title>Customers</title>
            </Head>
            <Card className="m-3">
                <CardHeader className="pb-2">
                    <CardTitle>Search users</CardTitle>
                    <CardDescription>Filter by name, email or phone</CardDescription>
                </CardHeader>
                <CardContent>
                    <IconField iconPosition="left" className="rounded-lg">
                        <InputIcon className="pi pi-search" />
                        <InputText
                            placeholder="Search"
                            className="w-1/2"
                            value={state.search}
                            onChange={(e) => dispatch(setSearch(e.target.value))}
                        />
                    </IconField>
                </CardContent>
            </Card>

            <div className="p-4">
                <DataTable<Customer>
                    data={{
                        current_page: state.page,
                        data: state.items,
                        from: state.from,
                        last_page: state.last,
                        per_page: state.perPage,
                        to: state.to,
                        total: state.total,
                        links: state.links,
                        // These URLs can be ignored since fetchCustomers handles the logic
                        first_page_url: '',
                        last_page_url: '',
                        next_page_url: '',
                        prev_page_url: '',
                    }}
                    columns={columns}
                    loading={state.loading}
                    search={state.search}
                    sortField={state.sortField as keyof Customer}
                    sortOrder={state.sortOrder}
                    onPageChange={handlePageChange}
                    onPerPageChange={handlePerPageChange}
                    onSearchChange={handleSearch}
                    onSortChange={handleSort}
                />
            </div>
        </AppLayout>
    );
};

export default CustomerList;
