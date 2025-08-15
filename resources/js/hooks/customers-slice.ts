import { Customer } from '@/types/customer';
import { paginatedSlice } from './paginated-slice';

export const {
    reducer: customers,
    actions: customerActions,
    fetchData: fetchCustomers,
} = paginatedSlice<Customer>('customers', route('customers.index'));
