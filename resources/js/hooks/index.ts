import { configureStore } from '@reduxjs/toolkit';
import { customers } from './customers-slice';
import { users } from './users-slice';

export const store = configureStore({
    reducer: { users, customers },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
