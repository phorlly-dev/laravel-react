import { api } from "@/lib/http";
import { Paginated } from "@/types/pagination";
import { initialState, User } from "@/types/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


// Async thunk (auto-cancellable with AbortController via signal)
export const fetchUsers = createAsyncThunk<
    Paginated<User>,
    { page?: number; search?: string }
>('users/fetch', async ({ page = 1, search = '' }, { signal, rejectWithValue }) => {
    try {
        const { data } = await api.get<Paginated<User>>(route('users.index'), {
            params: { page, search: search || undefined },
            signal,
        })
        return data
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message)
    }
})

const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload
            state.page = 1 // reset to first page on new search
        },
        clearError(state) {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUsers.fulfilled, (state, { payload }) => {
                state.loading = false
                state.items = payload.data
                state.page = payload.meta.current_page
                state.lastPage = payload.meta.last_page
                state.total = payload.meta.total
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.error = (action.payload as string) || 'Failed to load users'
            })
    },
})

export const { setPage, setSearch, clearError } = slice.actions
export default slice.reducer