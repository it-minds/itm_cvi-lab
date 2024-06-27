import React, { ReactNode } from 'react';

interface ColumnProps {
    children: ReactNode;
    width: number;  // width as a percentage or other CSS size unit
}

const Column: React.FC<ColumnProps> = ({ children, width }) => {
    return <div className={`column width-${width}`}>{children}</div>;
}

export default Column;