import {Accordion, Form, Modal} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import React, {useEffect, useState} from "react";
import {useIsMobile} from "../../hooks/useIsMobile";
import {postBonus} from "../../http/admin/userAdminAPI";

const ModalUserBonus = ({show, onHide, logs, user, handleUpdate}) => {
    const [currentLogs, setCurrentLogs] = useState([]);
    const [bonus, setBonus] = useState({qty: 0, comment: ''});
    const [showAccordion, setShowAccordion] = useState('0');
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
    const handleBonusCorrect = async (e) => {
        e.preventDefault()
        await postBonus({
            userId: user.id,
            qty: bonus.qty,
            comment: bonus.comment
        }).then(() => handleUpdate(user.id))
        setBonus({qty: 0, comment: ''})
        setShowAccordion('0')
    }
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
                    {user
                    ?<h3>Пользователь {user.id}. {user.name}: </h3>
                    :<h3>История изменения бонусов: </h3>
                    }


                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {user &&
                <section>
                    <h3>Информация:</h3>
                    <div>{user?.telephone}</div>
                    <div>{user?.address}</div>
                    <div>{user?.email}</div>
                    <h3>Бонусы</h3>
                    <div>Доступно: {Math.floor(user?.bonus_point?.currentQty  || 0)}</div>
                    <div>Заморожено: {user?.bonus_point?.frozenPoints || 0}</div>
                    <Accordion activeKey={showAccordion} className="userBonusAccordion mt-2">
                        <Accordion.Item onClick={() => setShowAccordion('1')} eventKey="1">
                            <Accordion.Header><div className="text-center w-100">Начисление\списание бонусов</div></Accordion.Header>
                            <Accordion.Body>
                                <Form>
                                    <Form.Control type="text" placeholder="Комментарий..." value={bonus.comment} onChange={(e) => setBonus({...bonus, comment: e.target.value})} />
                                    <div className='d-flex mt-1 justify-content-between'>
                                        <Form.Control className="w-50" aria-label="Количество" type="number" value={bonus.qty} onChange={(e) => setBonus({...bonus, qty: e.target.value})} />
                                        <MyButton onClick={(e) => handleBonusCorrect(e)}>Отправить</MyButton>
                                    </div>

                                </Form>

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </section>
                }
                {logs?.length>0 &&
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
                                        <td className="text-center">{dateTime(log.updatedAt)}</td>
                                        <td className="text-center">{Number(log.qtyChanges).toFixed(2)}</td>
                                        <td >{log.description}</td>
                                    </tr>
                                 )}
                            </tbody>
                        </table>
                    </section>

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

};

export default ModalUserBonus;