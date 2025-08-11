import React from 'react';

function escapeRegExp(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function Highlight({
    text,
    query,
    className = 'bg-yellow-200 dark:bg-yellow-600/40 rounded px-0.5',
}: {
    text: string;
    query: string;
    className?: string;
}) {
    if (!query) return <>{text}</>;
    const re = new RegExp(escapeRegExp(query), 'ig');

    const parts: React.ReactNode[] = [];
    let last = 0;
    let m: RegExpExecArray | null;

    while ((m = re.exec(text))) {
        const start = m.index;
        const end = start + m[0].length;
        if (start > last) parts.push(text.slice(last, start));
        parts.push(
            <mark key={start} className={className}>
                {text.slice(start, end)}
            </mark>,
        );
        last = end;
    }
    if (last < text.length) parts.push(text.slice(last));

    return <>{parts}</>;
}
