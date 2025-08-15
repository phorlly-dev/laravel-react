import '../css/app.css';

import DT from 'datatables.net-dt';
import DataTable from 'datatables.net-react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import {
    FilterMatchMode,
    PrimeReactProvider,
} from 'primereact/api';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { createInertiaApp } from '@inertiajs/react';

import { store } from './hooks';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const value: values = {
            appendTo: 'self',
            filterMatchMode: {
                text: [
                    FilterMatchMode.STARTS_WITH,
                    FilterMatchMode.CONTAINS,
                    FilterMatchMode.NOT_CONTAINS,
                    FilterMatchMode.ENDS_WITH,
                    FilterMatchMode.EQUALS,
                    FilterMatchMode.NOT_EQUALS,
                ],
                numeric: [
                    FilterMatchMode.EQUALS,
                    FilterMatchMode.NOT_EQUALS,
                    FilterMatchMode.LESS_THAN,
                    FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
                    FilterMatchMode.GREATER_THAN,
                    FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
                ],
                date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER],
            },
            inputStyle: 'filled',
            nonce: '.........',
            nullSortOrder: 1,
            ripple: true,
            zIndex: {
                modal: 1100, // dialog, sidebar
                overlay: 1000, // dropdown, overlaypanel
                menu: 1000, // overlay menus
                tooltip: 1100, // tooltip
                toast: 1200, // toast
            },
            autoZIndex: true,
        };

        root.render(
            <Provider store={store}>
                <PrimeReactProvider value={value}>
                    <App {...props} />
                </PrimeReactProvider>
            </Provider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
DataTable.use(DT);

type values = {
    appendTo: 'self';
    filterMatchMode: {
        text: [
            FilterMatchMode.STARTS_WITH,
            FilterMatchMode.CONTAINS,
            FilterMatchMode.NOT_CONTAINS,
            FilterMatchMode.ENDS_WITH,
            FilterMatchMode.EQUALS,
            FilterMatchMode.NOT_EQUALS,
        ];
        numeric: [
            FilterMatchMode.EQUALS,
            FilterMatchMode.NOT_EQUALS,
            FilterMatchMode.LESS_THAN,
            FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
            FilterMatchMode.GREATER_THAN,
            FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
        ];
        date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER];
    };
    inputStyle: 'filled';
    nonce: '.........';
    nullSortOrder: 1;
    ripple: true;
    zIndex: {
        modal: 1100; // dialog, sidebar
        overlay: 1000; // dropdown, overlaypanel
        menu: 1000; // overlay menus
        tooltip: 1100; // tooltip
        toast: 1200; // toast
    };
    autoZIndex: true;
};
