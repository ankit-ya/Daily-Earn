import React, { createContext, useState, useContext } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [wallet, setWallet] = useState(0); // Initialize wallet balance

    // Function to update wallet balance
    const updateWallet = (amount) => {
        setWallet((prevWallet) => prevWallet + amount);
    };

    return (
        <WalletContext.Provider value={{ wallet, updateWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    return useContext(WalletContext);
};
