import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatPhone, gender, Initials } from '@/lib';
import { Highlight } from '@/lib/highlight';
import { cn } from '@/lib/utils';
import { User } from '@/types/user';

export default function UserIDCard({ user, className, find }: { user: User; className?: string; find: string }) {
    const avatar = user.avatar;
    const role = user.is_admin ? 'Admin' : 'User';
    const statusColor = user.status ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700';

    return (
        <Card className={cn('relative overflow-hidden rounded-2xl', className)}>
            {/* Left decorative band (subtle, no overlap on content) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-21">
                <div className="absolute inset-0 rounded-tr-3xl bg-slate-900" />
                <div className="absolute top-6 -left-8 h-24 w-30 rotate-12 rounded-tr-3xl bg-teal-500/90" />
                <div className="absolute top-20 -left-6 h-24 w-29 rotate-12 rounded-tr-3xl bg-emerald-400/80" />
            </div>

            <div className="flex items-center gap-6 py-6 pr-6 pl-24">
                {/* Avatar */}
                <div className="shrink-0">
                    {avatar ? (
                        <img src={avatar} alt={user.name} className="size-24 rounded-full object-cover shadow-md ring-4 ring-white" />
                    ) : (
                        <div className="grid size-24 place-items-center rounded-full bg-amber-300 text-3xl font-bold text-slate-900 shadow-md ring-4 ring-white">
                            <Initials name={user.name} />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 text-gray-800 dark:text-gray-100">
                    <CardHeader className="px-0 pt-0 pb-2">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <h3 className="line-clamp-2 text-2xl leading-tight font-extrabold tracking-tight text-slate-900 dark:text-white">
                                    <Highlight text={user.name} query={find} />
                                </h3>
                                <div className="mt-0.5 flex items-center gap-2">
                                    <span className="text-sm text-slate-500 dark:text-gray-300">{role}</span>
                                    <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', statusColor)}>
                                        {user.status ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="px-0 pt-0">
                        {/* Neat label : value grid */}
                        <div className="grid grid-cols-[110px_12px_1fr] gap-y-1.5 text-[15px] text-slate-700">
                            <div className="font-semibold text-slate-800 dark:text-gray-200">ID Card</div>
                            <div className="text-slate-400">:</div>
                            <div className="truncate dark:text-gray-200">{user.id}</div>

                            <div className="font-semibold text-slate-800 dark:text-gray-200">Gender</div>
                            <div className="text-slate-400">:</div>
                            <div className="truncate dark:text-gray-200">{user.sex}</div>

                            <div className="font-semibold text-slate-800 dark:text-gray-200">Phone</div>
                            <div className="text-slate-400">:</div>
                            <div className="truncate text-blue-600 dark:text-blue-400">
                                <Highlight text={formatPhone(user.phone)} query={find} />
                            </div>

                            <div className="font-semibold text-slate-800 dark:text-gray-200">E‑mail</div>
                            <div className="text-slate-400">:</div>
                            <div className="truncate text-blue-600 dark:text-blue-400">
                                <Highlight text={user.email} query={find} />
                            </div>

                            <div className="font-semibold text-slate-800 dark:text-gray-200">Address</div>
                            <div className="text-slate-400">:</div>
                            <div className="line-clamp-2 dark:text-gray-300">{user.address || '—'}</div>
                        </div>
                    </CardContent>
                </div>
            </div>
        </Card>
    );
}

/* <CardFooter className="justify-end gap-2">
    <button className="rounded-md border bg-blue-500 px-3 py-2 text-white hover:bg-blue-600">View</button>
    <button className="rounded-md border bg-green-500 px-3 py-2 text-white hover:bg-green-600">Edit</button>
</CardFooter> */
