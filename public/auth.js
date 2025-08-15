// axios instance
import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  headers: { Accept: 'application/json' },
});

// on login
const { data } = await api.post('/login', { email, password, device_name: 'web' });
localStorage.setItem('token', data.token);
api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

// later requests automatically send token
const users = await api.get('/customers');

// on logout
await api.post('/logout');
localStorage.removeItem('token');
delete api.defaults.headers.common.Authorization;

// https://www.jsdelivr.com/package/npm/country-list-json