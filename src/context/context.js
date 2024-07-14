import React, { createContext, useState } from 'react';

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
    const [selectedCustomerName, setSelectedCustomerName] = useState("");

    return (
        <CustomerContext.Provider value={{ selectedCustomerName, setSelectedCustomerName }}>
            {children}
        </CustomerContext.Provider>
    );
};
