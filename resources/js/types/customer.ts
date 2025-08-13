
export interface Country {
    id: number;
    name: string;
    code: string;
}

export interface Representative {
    id: number;
    name: string;
    image: string;
}

export interface Customer {
    id: number;
    name: string;
    country: Country;
    company: string;
    date: string | Date;
    status: string;        // 'new' | 'qualified' | ...
    verified: boolean | number;
    activity: number;
    representative: Representative;
    balance: number;       // note: number (not string)
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface CustomerPayload {
    data: Customer[];
    meta: { total: number; status: string };
}
