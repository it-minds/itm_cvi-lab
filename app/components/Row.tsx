import React, { ReactNode } from 'react';

interface RowProps {
    children: ReactNode;
}

const Row: React.FC<RowProps> = ({ children }) => {
    return <div className="row">{children}</div>;
}

export default Row;