import React, { createContext, useContext, useState, } from 'react';

const ReceiptContext = createContext<any>(null);

export const ReceiptProvider = ({ children }: { children: React.ReactNode }) => {
    const [receipt, setReceiptState] = useState(() => {
        const stored = localStorage.getItem('receipt');
        return stored ? JSON.parse(stored) : null;
    });

    const setReceipt = (data: any) => {
        setReceiptState(data);
        localStorage.setItem('receipt', JSON.stringify(data));
    };

    return (
        <ReceiptContext.Provider value={{ receipt, setReceipt }}>
            {children}
        </ReceiptContext.Provider>
    );
};

export const useReceipt = () => useContext(ReceiptContext);
