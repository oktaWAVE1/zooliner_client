import React from 'react';
import ProductListAdmin from "../components/features/Admin/ProductListAdmin";

const AdminProductPage = () => {
    return (
        <div className="adminProductsPage">
            <h1>Управление товарами:</h1>
            <ProductListAdmin />
        </div>
    );
};

export default AdminProductPage;