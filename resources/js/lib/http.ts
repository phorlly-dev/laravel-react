import axios from 'axios'

// API client
export const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: { Accept: 'application/json' },
})

// Web client (no /api prefix)
export const web = axios.create({
    baseURL: '/',
    withCredentials: true,
    headers: { Accept: 'application/json' },
})
