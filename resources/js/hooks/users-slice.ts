import { User } from '@/types/user';
import { paginatedSlice } from './paginated-slice';

export const { reducer: users, actions: userActions, fetchData: fetchUsers } = paginatedSlice<User>('users', route('users.index'));
