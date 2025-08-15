import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export function formatPhone(phone: string | null | undefined) {
    if (!phone) return '—';
    // Remove non-digits
    const digits = phone.replace(/\D/g, '');
    // Format as: +XXX-XXX-XXXX (or shorter if not enough digits)
    if (digits.length === 11) {
        return `+${digits[0]}-${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
    } else if (digits.length === 10) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    return phone; // fallback if format unknown
}

export function Initials({ name }: { name: string }) {
    const initials = name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase())
        .join('');
    return initials || 'NA';
}

export function gender(key: string) {
    switch (key.toLowerCase()) {
        case 'male':
            return 'Male';
            break;
        case 'female':
            return 'Female';
            break;
        default:
            return 'Other';
            break;
    }
}

export const status = (key: string) => {
    const map: Record<string, string> = {
        pending: 'Pending Approval',
        approved: 'Approved ✅',
        rejected: 'Rejected ❌',
    };

    return map[key] || 'Unknown';
};

export const severity = (key: string) => {
    switch (key.toLowerCase()) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';

        case 'new':
            return 'info';

        case 'negotiation':
            return 'warning';

        case 'renewal':
            return null;
    }
};

export function me() {
    const { auth } = usePage<SharedData>().props;

    return auth.user;
}

export const date = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

export const currency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

