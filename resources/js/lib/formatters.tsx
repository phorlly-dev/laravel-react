export const formatCurrency = (amount: number, style: React.CSSProperties = {}) => {
    return <span style={{ color: 'green', fontWeight: 600, ...style }}>{amount.toLocaleString('en-US')} ៛</span>;
};
