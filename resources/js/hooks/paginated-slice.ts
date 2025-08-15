import { api } from '@/lib/http';
import {
    PaginatedState,
    Paginator,
} from '@/types/paginate';
import {
    createAsyncThunk,
    createSlice,
    Draft,
    PayloadAction,
} from '@reduxjs/toolkit';

export function paginatedSlice<T>(name: string, endpoint: string) {
    const fetchData = createAsyncThunk<
        Paginator<T>,
        {
            page?: number;
            perPage?: number;
            search?: string;
            sortField?: string;
            sortOrder?: string;
            extraParams?: Record<string, any>;
        }
    >(`${name}/fetch`, async ({ page = 1, perPage = 10, search = '', sortField, sortOrder, extraParams = {} }, { signal, rejectWithValue }) => {
        try {
            const { data } = await api.get<Paginator<T>>(endpoint, {
                params: {
                    page,
                    per_page: perPage,
                    search: search || undefined,
                    sort: sortField,
                    order: sortOrder,
                    ...extraParams, // Allow passing filters like status=active
                },
                signal,
            });
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    });

    const initialState: PaginatedState<T> = {
        items: [],
        loading: false,
        error: null,
        page: 1,
        perPage: 10,
        last: 1,
        from: 1,
        to: 5,
        total: 0,
        links: [],
        search: '',
        sortField: '',
        sortOrder: 'asc',
    };

    const slice = createSlice({
        name,
        initialState,
        reducers: {
            setPage(state, action: PayloadAction<number>) {
                state.page = action.payload;
            },
            setPerPage(state, action: PayloadAction<number>) {
                state.perPage = action.payload;
                state.page = 1; // reset page
            },
            setSearch(state, action: PayloadAction<string>) {
                state.search = action.payload;
                state.page = 1;
            },
            setSort(state, action: PayloadAction<{ field: string; order: 'asc' | 'desc' }>) {
                state.sortField = action.payload.field;
                state.sortOrder = action.payload.order;
            },
            clearError(state) {
                state.error = null;
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchData.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchData.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.items = payload.data as Draft<T>[];
                    state.page = payload.current_page;
                    state.perPage = payload.per_page;
                    state.last = payload.last_page;
                    state.total = payload.total;
                    state.from = payload.from;
                    state.to = payload.to;
                    state.links = payload.links;
                })
                .addCase(fetchData.rejected, (state, action) => {
                    state.loading = false;
                    state.error = (action.payload as string) || 'Failed to load data';
                });
        },
    });

    return {
        reducer: slice.reducer,
        actions: slice.actions,
        fetchData,
    };
}
