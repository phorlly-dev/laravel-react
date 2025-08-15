import { useCallback } from 'react';

import {
    useDispatch,
    useSelector,
} from 'react-redux';

// Types for your existing Redux slice
interface PaginatedState<T> {
    items: T[];
    loading: boolean;
    error: string | null;
    page: number;
    perPage: number;
    last: number;
    from: number;
    to: number;
    total: number;
    links: any[];
    search: string;
    sortField: string;
    sortOrder: 'asc' | 'desc';
}

interface PaginatedActions {
    setPage: (page: number) => any;
    setPerPage: (perPage: number) => any;
    setSearch: (search: string) => any;
    setSort: (sort: { field: string; order: 'asc' | 'desc' }) => any;
    clearError: () => any;
}

interface FetchDataFunction {
    (params: {
        page?: number;
        perPage?: number;
        search?: string;
        sortField?: string;
        sortOrder?: 'asc' | 'desc';
        extraParams?: Record<string, any>;
    }): any;
}

// Hook to integrate with your paginatedSlice
export function useDataTable<T>(stateSelector: (state: any) => PaginatedState<T>, actions: PaginatedActions, fetchData: FetchDataFunction) {
    const dispatch = useDispatch();
    const state = useSelector(stateSelector);

    // Wrap actions with dispatch
    const wrappedActions = {
        setPage: useCallback((page: number) => dispatch(actions.setPage(page)), [dispatch, actions]),
        setPerPage: useCallback((perPage: number) => dispatch(actions.setPerPage(perPage)), [dispatch, actions]),
        setSearch: useCallback((search: string) => dispatch(actions.setSearch(search)), [dispatch, actions]),
        setSort: useCallback((sort: { field: string; order: 'asc' | 'desc' }) => dispatch(actions.setSort(sort)), [dispatch, actions]),
        clearError: useCallback(() => dispatch(actions.clearError()), [dispatch, actions]),
    };

    // Wrap fetchData with dispatch
    const wrappedFetchData = useCallback((params: Parameters<FetchDataFunction>[0]) => dispatch(fetchData(params)), [dispatch, fetchData]);

    // Utility functions
    const refresh = useCallback(() => {
        wrappedFetchData({
            page: state.page,
            perPage: state.perPage,
            search: state.search,
            sortField: state.sortField,
            sortOrder: state.sortOrder,
        });
    }, [wrappedFetchData, state]);

    const isFirstPage = state.page === 1;
    const isLastPage = state.page === state.last;

    const getPageNumbers = useCallback((): (number | string)[] => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5;
        const { page: currentPage, last: totalPages } = state;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const half = Math.floor(maxVisiblePages / 2);
            let start = Math.max(currentPage - half, 1);
            let end = Math.min(start + maxVisiblePages - 1, totalPages);

            if (end - start + 1 < maxVisiblePages) {
                start = Math.max(end - maxVisiblePages + 1, 1);
            }

            if (start > 1) {
                pages.push(1);
                if (start > 2) pages.push('...');
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages) {
                if (end < totalPages - 1) pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    }, [state.page, state.last]);

    return {
        state,
        actions: wrappedActions,
        fetchData: wrappedFetchData,
        refresh,
        isFirstPage,
        isLastPage,
        pageNumbers: getPageNumbers(),
    };
}

// Alternative hook for direct Redux slice usage
export function useDataTableSlice<T>(
    slice: {
        reducer: any;
        actions: PaginatedActions;
        fetchData: FetchDataFunction;
    },
    stateSelector: (state: any) => PaginatedState<T>,
) {
    return useDataTable<T>(stateSelector, slice.actions, slice.fetchData);
}
