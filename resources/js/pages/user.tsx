import UserIDCard from '@/components/partials/user-id-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Pagination from '@/components/ui/pagination';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { api } from '@/lib/http';
import type { BreadcrumbItem, PagePayload, User } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

import { useEffect, useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Users', href: route('user.list') }];

const UsersIndex = ({ initial, currentUserId }: { initial: PagePayload; currentUserId: number }) => {
    const [items, setItems] = useState<User[]>(initial.data);
    const [page, setPage] = useState(initial.meta.current_page);
    const [totalPage, setTotalPage] = useState(initial.meta.total);
    const [lastPage, setLastPage] = useState(initial.meta.last_page);
    const [search, setSearch] = useState(initial.search || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getInitials = useInitials();
    const visibleItems = items.filter((u) => u.id !== currentUserId);

    const fetchPage = useMemo(() => {
        return async (pageNum: number, searchTerm: string) => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await api.get(route('users.index'), {
                    params: { page: pageNum, search: searchTerm },
                });
                setItems(data.data);
                setPage(data.meta.current_page);
                setTotalPage(data.meta.total);
                setLastPage(data.meta.last_page);
            } catch (e: any) {
                setError(e.response?.data?.message || e.message);
            } finally {
                setLoading(false);
            }
        };
    }, []);

    useEffect(() => {
        if (search.trim() === '') {
            // instant reset to initial data; optionally also refresh from API:
            setItems(initial.data);
            setPage(initial.meta.current_page);
            setLastPage(initial.meta.last_page);

            return;
        }
        const t = setTimeout(() => fetchPage(1, search), 300);

        return () => clearTimeout(t);
    }, [search]);

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
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText placeholder="Search" className="w-1/2" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </IconField>
                </CardContent>
            </Card>

            {loading && <div className="m-12">Loading…</div>}
            {error && <div className="mx-12 text-red-600">Error: {error}</div>}

            {!loading && !error && (
                <div className="m-3 space-y-4">
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
                    <Card>
                        <CardContent className="py-4">
                            <div className="flex items-center justify-around">
                                <Pagination currentPage={page} totalPages={totalPage} onPageChange={(page) => setPage(page)} />

                                <span className="text-sm">
                                    Page {page} / {lastPage}
                                </span>
                            </div>
                            <div className="card justify-content-center flex">
                                <Button label="Check" icon="pi pi-check" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </AppLayout>
    );
};

export default UsersIndex;
