import React, {useState} from 'react';
import {Card, Container} from "react-bootstrap";
import MyButton from "../UI/MyButton/MyButton";
import CreateType from "../components/modals/CreateType";

import AdminComments from "../components/modals/AdminComments";
import CreateLesson from "../components/modals/CreateLesson";
import AdminLessons from "../components/modals/AdminLessons";
import {Helmet} from "react-helmet";

const Admin = () => {
    const [modals, setModals] = useState({type: false, users: false, comments: false, createLesson: false, adminLesson: false})
    const [unread, setUnread] = useState(0)
    return (
        <div className='adminPage'>
            <Container>
                <h1>Админка:</h1>
                <hr/>
                <Card className='adminCard'>
                    <MyButton
                        onClick={() => setModals({...modals, type: true})}
                    >Типы уроков</MyButton>
                    <MyButton onClick={() => setModals({...modals, createLesson: true})}>Добавить урок</MyButton>
                    <MyButton onClick={() => setModals({...modals, adminLesson: true})}>Управление уроками</MyButton>
                    <MyButton onClick={() => setModals({...modals, users: true})}>Управление премиумом</MyButton>
                    <MyButton onClick={() => setModals({...modals, comments: true})}>Управление отзывами {unread>0 && `(Новых: ${unread})`}</MyButton>
                </Card>
            </Container>
            <CreateType onHide={() => setModals({...modals, type: false})} show={modals.type}/>
            <AdminComments onHide={() => setModals({...modals, comments: false})} show={modals.comments} setUnread={setUnread}/>
            <CreateLesson onHide={() => setModals({...modals, createLesson: false})} show={modals.createLesson} />
            <AdminLessons onHide={() => setModals({...modals, adminLesson: false})} show={modals.adminLesson} />
            <Helmet>
                <title>Админка | Зоолайнер</title>
            </Helmet>
        </div>
    );
};

export default Admin;