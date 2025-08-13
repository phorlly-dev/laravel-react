import { SharedData } from "@/types"
import { usePage } from "@inertiajs/react"

export function formatPhone(phone: string | null | undefined) {
    if (!phone) return '—'
    // Remove non-digits
    const digits = phone.replace(/\D/g, '')
    // Format as: +XXX-XXX-XXXX (or shorter if not enough digits)
    if (digits.length === 11) {
        return `+${digits[0]}-${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`
    } else if (digits.length === 10) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
    }

    return phone // fallback if format unknown
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
    switch (key) {
        case 'male': return 'Male'
            break;
        case 'female': return 'Female'
            break;
        default: return 'Other'
            break;
    }
}

export function me() {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    return auth.user;
}
