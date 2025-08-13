// store/customers.slice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from '@/lib/http'                 // axios instance (baseURL '/api')
import type { Customer, CustomerPayload } from '@/types/customer'

type State = {
    items: Customer[]
    total: number
    search: string
    loading: boolean
    error: string | null
}

const initialState: State = {
    items: [],
    total: 0,
    search: '',
    loading: false,
    error: null,
}

// GET /customers?search=...
export const fetchCustomers = createAsyncThunk<
    CustomerPayload,
    { search?: string }
>('customers/fetch', async ({ search = '' }, { signal, rejectWithValue }) => {
    try {
        const { data } = await api.get<CustomerPayload>(route('customers.index'), {
            params: { search: search || undefined },
            signal,
        })
        return data
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message)
    }
})

const slice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        setSearch: (s, a: PayloadAction<string>) => { s.search = a.payload },
    },
    extraReducers: (b) => {
        b.addCase(fetchCustomers.pending, (s) => { s.loading = true; s.error = null })
            .addCase(fetchCustomers.fulfilled, (s, { payload }) => {
                s.loading = false
                s.items = payload.data
                s.total = payload.meta.total
            })
            .addCase(fetchCustomers.rejected, (s, a) => {
                s.loading = false
                s.error = (a.payload as string) || 'Failed to load customers'
            })
    }
})

export const { setSearch } = slice.actions
export default slice.reducer
