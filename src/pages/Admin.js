import React, {useState, Suspense} from 'react';
import {Container} from "react-bootstrap";
import MyButton from "../UI/MyButton/MyButton";
import {Helmet} from "react-helmet";
import {useNavigate} from "react-router-dom";
import Loader from "../UI/Loader/Loader";

const AdminAttributeModal = React.lazy(() => import('../components/modals/AdminAttributeModal'));
const AdminBrandModal = React.lazy(() => import('../components/modals/AdminBrandModal'));
const AdminCategoryModal = React.lazy(() => import('../components/modals/AdminCategoryModal'));
const AdminPromotionsModal = React.lazy(() => import('../components/modals/AdminPromotionsModal'));

const Admin = () => {
    const [modals, setModals] = useState({brand: false, category: false, promo:false, attributes: false})
    const navigate = useNavigate()
    return (
        <div className='adminPage'>
            <Container>
                <h1>Админка:</h1>
                <hr/>
                <div className='adminCard row gap-1'>
                    <MyButton onClick={() => setModals({...modals, brand: true})}>Производители</MyButton>
                    <MyButton onClick={() => setModals({...modals, category: true})}>Категории</MyButton>
                    <MyButton onClick={() => setModals({...modals, attributes: true})}>Атрибуты</MyButton>
                    <MyButton onClick={() => setModals({...modals, promo: true})}>Промо акции</MyButton>
                    <MyButton onClick={() => navigate('/admin/orders')}>Управление заказами</MyButton>
                    <MyButton onClick={() => navigate('/admin/users')}>Управление пользователями</MyButton>
                    <MyButton onClick={() => navigate('/admin/products')}>Управление товарами</MyButton>

                </div>
            </Container>
            <Suspense fallback={<Loader />}>
                <AdminPromotionsModal show={modals.promo} onHide={() => setModals({...modals, promo: false})} />
                <AdminAttributeModal show={modals.attributes} onHide={() => setModals({...modals, attributes: false})} />
                <AdminBrandModal onHide={() => setModals({...modals, brand: false})} show={modals.brand} />
                <AdminCategoryModal onHide={() => setModals({...modals, category: false})} show={modals.category} />
            </Suspense>
            <Helmet>
                <title>Админка | ЗооЛАЙНЕР</title>
            </Helmet>
        </div>
    );
};

export default Admin;