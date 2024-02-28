import {Accordion, Form, Modal} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import React, {useContext, useEffect, useState} from "react";
import {useIsMobile} from "../../hooks/useIsMobile";
import {postBonus} from "../../http/admin/userAdminAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import UserAdminControl from "../features/UserAdminControl";

const ModalUserBonus = observer(({show, onHide, logs, currentUser, handleUpdate}) => {
    const [currentLogs, setCurrentLogs] = useState([]);
    const {user} = useContext(Context)

    useEffect(() => {
        if (logs){
            setCurrentLogs(logs.slice(0, 10))
        }
    }, [logs]);

    const dateTime = (timestamp) => {
        const date = new Date(timestamp)
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    }
    const loadTen = () => {
        setCurrentLogs(prev => [...prev, ...logs.slice(currentLogs.length, logs.length-currentLogs.length>9 ? currentLogs.length+10 : logs.length)])
    }
    const loadAll = () => {
        setCurrentLogs(logs)
    }

    const isMobile = useIsMobile()

    return (
        <Modal
            className='modal'
            show={show}
            onHide={onHide}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            fullscreen={isMobile}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {currentUser
                    ?<h3>Пользователь {currentUser.id}. {currentUser.name} ({currentUser?.role}): </h3>
                    :<h3>История изменения бонусов: </h3>
                    }


                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {currentUser && user.user.role === "ADMIN" &&
                <UserAdminControl handleUpdate={handleUpdate} currentUser={currentUser} />
                }
                {logs?.length>0 ?
                    <section>
                        <table className="table">
                            <thead className="text-center">
                            <tr>
                                <td><strong>Дата</strong></td>
                                <td><strong>Бонусы</strong></td>
                                <td><strong>Описание</strong></td>
                            </tr>
                            </thead>
                            <tbody>
                                {currentLogs.map(log =>
                                    <tr key={log.id}>
                                        <td className="text-center">{new Date(log.updatedAt).toLocaleDateString()}</td>
                                        <td className="text-center">{Number(log.qtyChanges).toFixed(2)}</td>
                                        <td >{log.description}</td>
                                    </tr>
                                 )}
                            </tbody>
                        </table>
                    </section> :
                    <h3 className='w-100 text-center'>История начисления бонусов пока пустая...</h3>

                }
                {logs?.length!==currentLogs.length &&
                    <div className="mt-3 d-flex gap-2 justify-content-center">
                        <MyButton onClick={() => loadTen()}>Загрузить еще 10</MyButton>
                        <MyButton onClick={() => loadAll()}>Загрузить все</MyButton>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <MyButton onClick={onHide}>Закрыть</MyButton>
            </Modal.Footer>
        </Modal>
    );

});

export default ModalUserBonus;