import UserIDCard from '@/components/partials/user-id-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Pagination from '@/components/ui/pagination';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchUsers, userActions } from '@/hooks/users-slice';
import AppLayout from '@/layouts/app-layout';
import { me } from '@/lib';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Users', href: route('user.list') }];

const UserList = () => {
    const dispatch = useAppDispatch();
    const { items, page, last, search, error, links, loading } = useAppSelector((state) => state.users);
    const visibleItems = items.filter((u) => u.id !== me().id);

    // Fetch whenever page or search changes
    useEffect(() => {
        const time = setTimeout(() => dispatch(fetchUsers({ page, search })), 250);

        return () => clearTimeout(time);
    }, [dispatch, page, search]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            {/* Search Card */}
            <Card className="m-3">
                <CardHeader className="pb-2">
                    <CardTitle>Search users</CardTitle>
                    <CardDescription>Filter by name, email or phone</CardDescription>
                </CardHeader>
                <CardContent>
                    <IconField iconPosition="left" className="rounded-lg">
                        <InputIcon className="pi pi-search" />
                        <InputText
                            placeholder="Search"
                            className="w-1/2"
                            value={search}
                            onChange={(e) => dispatch(userActions.setSearch(e.target.value))}
                        />
                    </IconField>
                </CardContent>
            </Card>

            {loading && <div className="m-12">Loading…</div>}
            {error && <div className="mx-12 text-red-600">Error: {error}</div>}

            {!loading && !error && (
                <div className="m-3 space-y-2">
                    {/* Cards grid */}
                    {visibleItems.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {visibleItems.map((state, idx) => (
                                <UserIDCard user={state} find={search} />
                            ))}
                        </div>
                    ) : (
                        // Empty state card
                        <Card className="border-dashed">
                            <CardHeader>
                                <CardTitle>No users found</CardTitle>
                                <CardDescription>Try a different search term.</CardDescription>
                            </CardHeader>
                        </Card>
                    )}

                    {/* Pager Card */}
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center">
                            <Pagination current={page} last={last} onChange={(p) => dispatch(userActions.setPage(p))} links={links} />
                        </CardContent>
                    </Card>
                </div>
            )}
        </AppLayout>
    );
};

export default UserList;
