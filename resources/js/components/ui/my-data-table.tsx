import React, { Fragment } from 'react';

import { cn } from '@/lib/utils'; // Assuming cn utility function is available

// Paginator interface from your Laravel API
interface Paginator<T> {
    current_page: number;
    data: T[];
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
}

// Define the shape of a column
interface Column<T> {
    key: keyof T;
    title: string;
    sortable?: boolean;
    render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: Paginator<T>;
    columns: Column<T>[];
    loading: boolean;
    search: string;
    sortField: keyof T | '';
    sortOrder: string| 'asc' | 'desc';
    onPageChange: (newPage: number) => void;
    onPerPageChange: (newPerPage: string) => void;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSortChange: (field: keyof T) => void;
}

export function DataTable<T extends { [key: string]: any }>(
    {
        data,
        columns,
        loading,
        search,
        sortField,
        sortOrder,
        onPageChange,
        onPerPageChange,
        onSearchChange,
        onSortChange,
    }: DataTableProps<T>
) {
    const {
        current_page: currentPage,
        last_page: lastPage,
        per_page: perPage,
        from,
        to,
        total,
    } = data;

    const pageNumbers = () => {
        // This function will generate the page numbers as seen in the image
        // It shows a limited range of pages with ellipsis for a cleaner UI
        const delta = 2; // Number of pages to show around the current page
        const range = [];

        // Add pages around the current one
        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
            if (i >= 1 && i <= lastPage) {
                range.push(i);
            }
        }

        // Add first page and ellipsis if needed
        if (currentPage - delta > 1) {
            if (currentPage - delta > 2) {
                range.unshift('...');
            }
            range.unshift(1);
        }

        // Add last page and ellipsis if needed
        if (currentPage + delta < lastPage) {
            if (currentPage + delta < lastPage - 1) {
                range.push('...');
            }
            range.push(lastPage);
        }

        return range;
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                {/* Per page selector */}
                <select
                    value={String(perPage)}
                    onChange={(e) => onPerPageChange(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 text-sm"
                >
                    <option value="10">10 entries per page</option>
                    <option value="25">25 entries per page</option>
                    <option value="50">50 entries per page</option>
                </select>

                {/* Search input */}
                <div className="flex items-center">
                    <label htmlFor="search" className="mr-2 text-gray-700">Search:</label>
                    <input
                        id="search"
                        type="text"
                        value={search}
                        onChange={onSearchChange}
                        className="border border-gray-300 rounded-md p-1"
                        placeholder="Search..."
                    />
                </div>
            </div>

            {/* Main Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={String(col.key)}
                                    className={cn(
                                        'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                        col.sortable && 'cursor-pointer hover:bg-gray-100'
                                    )}
                                    onClick={() => col.sortable && onSortChange(col.key)}
                                >
                                    <div className="flex items-center">
                                        {col.title}
                                        {col.sortable && sortField === col.key && (
                                            <span className="ml-2">
                                                {sortOrder === 'asc' ? '▲' : '▼'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : data.data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No data found.
                                </td>
                            </tr>
                        ) : (
                            data.data.map((item, rowIndex) => (
                                <tr key={rowIndex}>
                                    {columns.map((col) => (
                                        <td key={String(col.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {col.render ? col.render(item) : item[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                    Showing {from} to {to} of {total} entries
                </div>
                <nav className="flex space-x-1" aria-label="Pagination">
                    {/* Previous Button */}
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={cn(
                            'relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border',
                            'text-gray-700 bg-white hover:bg-gray-50',
                            'disabled:opacity-50 disabled:cursor-not-allowed'
                        )}
                    >
                        Previous
                    </button>

                    {/* Page Numbers */}
                    {pageNumbers().map((page, index) => (
                        <Fragment key={index}>
                            {page === '...' ? (
                                <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
                                    ...
                                </span>
                            ) : (
                                <button
                                    onClick={() => onPageChange(page as number)}
                                    className={cn(
                                        'relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-full',
                                        currentPage === page
                                            ? 'z-10 bg-blue-100 text-blue-600 border border-blue-200'
                                            : 'text-gray-700 bg-white hover:bg-gray-50'
                                    )}
                                >
                                    {page}
                                </button>
                            )}
                        </Fragment>
                    ))}

                    {/* Next Button */}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === lastPage}
                        className={cn(
                            'relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border',
                            'text-gray-700 bg-white hover:bg-gray-50',
                            'disabled:opacity-50 disabled:cursor-not-allowed'
                        )}
                    >
                        Next
                    </button>
                </nav>
            </div>
        </div>
    );
}