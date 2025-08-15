export interface Meta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}
export interface Paginated<T> {
    data: T[];
    meta: Meta;
    links: { next: string | null; prev: string | null };
}

export interface Paginator<T> {
    current_page: number;
    data: T[];
    first_page_url: string | null;
    from: number;
    last_page: number;
    last_page_url: string | null;
    links: Links[];
    next_page_url: string | null;
    path: string | null;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface Links {
    url: string | null;
    label: string | null;
    active: number | boolean;
}

export interface PaginationProps {
    current: number;
    last: number;
    links: Links[];
    onChange: (page: number) => void;
}

export interface PaginatedState<T> {
    items: T[];
    loading: boolean;
    error: string | null;
    page: number;
    perPage: number;
    last: number;
    from: number;
    total: number;
    links: any[];
    search: string;
    sortField: string;
    to: number;
    sortOrder: string;
}

export type Column<T> = {
    header: string;
    accessor: keyof T | string;
    sortable?: boolean;
    render?: (row: T) => React.ReactNode;
};

export type DataTableProps<T> = {
    title: string;
    columns: Column<T>[];
    fetchData: (params: { page: number; perPage: number; search: string; sortField: string; sortOrder: 'asc' | 'desc' }) => Promise<{
        data: T[];
        total: number;
        last_page: number;
        current_page: number;
    }>;
    loading: boolean | number;
    error: string | null;
    perPageOptions?: number[];
};
