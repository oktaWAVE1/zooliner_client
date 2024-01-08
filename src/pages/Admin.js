import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import MyButton from "../UI/MyButton/MyButton";
import AdminBrandModal from "../components/modals/AdminBrandModal";

import {Helmet} from "react-helmet";
import {useNavigate} from "react-router-dom";
import AdminCategoryModal from "../components/modals/AdminCategoryModal";

const Admin = () => {
    const [modals, setModals] = useState({brand: false, category: false, users: false, comments: false, createLesson: false, adminLesson: false})
    const navigate = useNavigate()
    return (
        <div className='adminPage'>
            <Container>
                <h1>Админка:</h1>
                <hr/>
                <div className='adminCard row gap-1'>
                    <MyButton onClick={() => setModals({...modals, brand: true})}>Производители</MyButton>
                    <MyButton onClick={() => setModals({...modals, category: true})}>Категории</MyButton>
                    <MyButton onClick={() => navigate('/admin/orders')}>Управление заказами</MyButton>
                    <MyButton onClick={() => navigate('/admin/users')}>Управление пользователями</MyButton>
                    <MyButton onClick={() => navigate('/admin/products')}>Управление товарами</MyButton>

                </div>
            </Container>
            <AdminBrandModal onHide={() => setModals({...modals, brand: false})} show={modals.brand} />
            <AdminCategoryModal onHide={() => setModals({...modals, category: false})} show={modals.category} />
            <Helmet>
                <title>Админка | ЗооЛАЙНЕР</title>
            </Helmet>
        </div>
    );
};

export default Admin;