import React from 'react';
import OrderListAdmin from "../components/features/Admin/OrderListAdmin";

const AdminOrders = () => {



    return (
        <div className='adminOrders'>
            <h1>Управление заказами:</h1>
            <OrderListAdmin />
        </div>
    );
};

export default AdminOrders;