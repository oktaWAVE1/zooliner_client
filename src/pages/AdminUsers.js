import React from 'react';
import UserListAdmin from "../components/features/Admin/UserListAdmin";

const AdminUsers = () => {
    return (
        <div className="adminUsersPage">
            <h1>Управление пользователями:</h1>
            <UserListAdmin />
        </div>
    );
};

export default AdminUsers;