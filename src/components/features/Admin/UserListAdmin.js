import React, {useEffect, useState} from 'react';
import {fetchAllUsers} from "../../../http/admin/userAdminAPI";
import MyButton from "../../../UI/MyButton/MyButton";
import {Form} from "react-bootstrap";
import ModalPagination from "./ModalPagination";
import UserLineAdmin from "./UserLineAdmin";
import {useNavigate} from "react-router-dom";
import {useUsersSearch} from "../../../hooks/useUsersSearch";
import useDebounce from "../../../hooks/useDebounce";
import ModalUserBonus from "../../modals/ModalUserBonus";

const UserListAdmin = () => {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState('');
    const [currentUsers, setCurrentUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const navigate = useNavigate()

    const handleUpdate = (id) => {
        fetchAllUsers().then(data => {
            setUsers([...data].sort((a,b) => a.name - b.name))
            data.filter(u => u.id===id && setCurrentUser(u))
        })

    }

    const showUser = (user) => {
        setCurrentUser(user)
        setModalVisible(true)
    }
    const searchedUsers = useUsersSearch(users, query)
    useEffect(() => {
        fetchAllUsers().then(data => setUsers([...data].sort((a,b) => a.name - b.name)))
        // eslint-disable-next-line
    }, []);

    useDebounce(() => {
        setCurrentUsers([...searchedUsers].slice(limit*(page-1), limit*page))
    }, 200, [page, limit, searchedUsers]);

    return (
        <div>
            <ModalUserBonus handleUpdate={handleUpdate} show={modalVisible} onHide={() => setModalVisible(false)} logs={currentUser?.bonus_point?.bonus_points_logs} currentUser={currentUser} />
            <div className="d-flex justify-content-between align-items-end">
                <label>
                    <input min={5} max={1000} className='adminLimit mb-1' type='number' value={limit} onChange={e => setLimit(e.target.value)} />
                    <span style={{marginLeft: "15px"}}>Лимит</span>
                </label>
                <MyButton classes={"pb-1 pt-1"} onClick={() => navigate(-1)}>НАЗАД</MyButton>

            </div>
            <hr className="mt-2 mb-2 pt-0" />
            <Form id="OrderSearchForm" className="mb-3">
                <Form.Control type={'text'} placeholder="Поиск заказа..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </Form>
            {currentUsers?.length>0 &&
               <div className='adminUsersList'>
                    {
                        currentUsers.map(user =>
                            <UserLineAdmin showUser={showUser} user={user} key={user.id}/>
                        )
                    }
               </div>

            }
            <ModalPagination page={page} setPage={setPage} limit={limit} total={searchedUsers.length} />

        </div>
    );
};

export default UserListAdmin;