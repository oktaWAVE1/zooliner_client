import React from 'react';
import StocksList from "../components/features/StocksList";

const StocksPage = () => {
    return (
        <div>
            <h1 className="text-center w-100">Товарные остатки</h1>
            <StocksList />
        </div>
    );
};

export default StocksPage;