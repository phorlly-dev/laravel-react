
export interface Meta {
    current_page: number
    last_page: number
    per_page: number
    total: number
}
export interface Paginated<T> {
    data: T[]
    meta: Meta
    links: { next: string | null; prev: string | null }
}