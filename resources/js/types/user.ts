export interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean | number;
    sex: string;
    status: boolean | number;
    avatar?: string;
    phone?: string | null;
    dob: string;
    address: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface UsersState {
    items: User[];
    page: number;
    last: number;
    total: number;
    links: any;
    search: string;
    loading: boolean;
    error: string | null;
}

export const initialState: UsersState = {
    items: [],
    page: 1,
    last: 1,
    links: [],
    total: 0,
    search: '',
    loading: false,
    error: null,
};
