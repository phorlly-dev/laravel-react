import { DataTableProps } from '@/types/paginate';
import { useEffect, useState } from 'react';

export default function DataTable<T extends { id: number }>({ title, columns, fetchData, perPageOptions = [10, 25, 50, 100] }: DataTableProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(perPageOptions[0]);
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState<string>(columns[0].accessor as string);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    // Fetch data from API
    useEffect(() => {
        setLoading(true);
        fetchData({ page, perPage, search, sortField, sortOrder })
            .then((res) => {
                setData(res.data);
                setTotal(res.total);
                setLastPage(res.last_page);
            })
            .finally(() => setLoading(false));
    }, [page, perPage, search, sortField, sortOrder]);

    const handleSort = (accessor: string) => {
        if (sortField === accessor) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(accessor);
            setSortOrder('asc');
        }
        setPage(1);
    };

    return (
        <div className="rounded-sm border p-4 shadow">
            {/* Title & Search */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{title}</h2>
                <input
                    type="text"
                    placeholder="Keyword Search"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="rounded-lg border px-3 py-1 active:border-blue-500"
                />
            </div>

            {/* Table */}
            <table className="w-full border-collapse border rounded-2xl">
                <thead>
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className="cursor-pointer border p-2 select-none"
                                onClick={() => col.sortable && handleSort(col.accessor as string)}
                            >
                                {col.header} {col.sortable && sortField === col.accessor && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length} className="p-4 text-center">
                                Loading...
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr key={row.id}>
                                {columns.map((col, i) => (
                                    <td key={i} className="border p-2">
                                        {col.render ? col.render(row) : (row as any)[col.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
                <div>
                    Page {page} of {lastPage} — {total} records
                </div>
                <div className="flex items-center gap-2">
                    <button disabled={page === 1} onClick={() => setPage(1)}>
                        ⏮
                    </button>
                    <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                        ◀
                    </button>
                    <span>{page}</span>
                    <button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
                        ▶
                    </button>
                    <button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
                        ⏭
                    </button>

                    <select
                        value={perPage}
                        onChange={(e) => {
                            setPerPage(Number(e.target.value));
                            setPage(1);
                        }}
                    >
                        {perPageOptions.map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
