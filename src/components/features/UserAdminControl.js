import React, {useState} from 'react';
import {Accordion, Form} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import {postBonus, setEmailActivation, setRole} from "../../http/admin/userAdminAPI";

const UserAdminControl = ({currentUser, handleUpdate}) => {
    const [bonus, setBonus] = useState({qty: 0, comment: ''});
    const [showAccordion, setShowAccordion] = useState({bonus: '0', role: '0', activated: '0'});
    const handleBonusCorrect = async (e) => {
        e.preventDefault()
        await postBonus({
            userId: currentUser.id,
            qty: bonus.qty,
            comment: bonus.comment
        }).then(() => handleUpdate(currentUser.id))
        setBonus({qty: 0, comment: ''})
        setShowAccordion({...showAccordion, bonus: '0'})
    }
    const handleRoleUpdate = async(e) =>{
        e.preventDefault()
        await setRole({userId: currentUser.id, role: e.target.value}).then(() => handleUpdate(currentUser.id))
    }

    const handleEmailActivatedUpdate = async(e) =>{
        e.preventDefault()
        await setEmailActivation({userId: currentUser.id, isActivated: !currentUser.isActivated}).then(() => handleUpdate(currentUser.id))
    }

    return (
        <section>
            <h3>Информация:</h3>
            <div>{currentUser?.telephone}</div>
            <div>{currentUser?.address}</div>
            <div>{currentUser?.email}</div>
            <h3>Бонусы</h3>
            <div>Доступно: {Math.floor(currentUser?.bonus_point?.currentQty  || 0)}</div>
            <div>Заморожено: {currentUser?.bonus_point?.frozenPoints || 0}</div>
            <Accordion activeKey={showAccordion.bonus} className="userBonusAccordion mt-2">
                <Accordion.Item  eventKey="1">
                    <Accordion.Header onClick={() => setShowAccordion(showAccordion.bonus==='1' ? {...showAccordion, bonus: '0'} : {...showAccordion, bonus: '1'})}><div className="text-center w-100">Начисление\списание бонусов</div></Accordion.Header>
                    <Accordion.Body>
                        <Form id="UserBonusForm">
                            <Form.Control type="text" placeholder="Комментарий..." value={bonus.comment} onChange={(e) => setBonus({...bonus, comment: e.target.value})} />
                            <div className='d-flex mt-1 justify-content-between'>
                                <Form.Control className="w-50" aria-label="Количество" type="number" value={bonus.qty} onChange={(e) => setBonus({...bonus, qty: e.target.value})} />
                                <MyButton onClick={(e) => handleBonusCorrect(e)}>Отправить</MyButton>
                            </div>

                        </Form>

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion activeKey={showAccordion.role} className="userRoleAccordion mt-2">
                <Accordion.Item eventKey="1">
                    <Accordion.Header onClick={() => setShowAccordion(showAccordion.role==='1' ? {...showAccordion, role: '0'} : {...showAccordion, role: '1'})}><div className="text-center w-100">Назначить роль</div></Accordion.Header>
                    <Accordion.Body>
                        <Form id="UserRoleForm">
                            <Form.Label className="mb-0 w-100 d-flex justify-content-center align-items-center">
                                <span className="px-2 w-25">Роль пользователя</span>
                                <Form.Select onChange={(e) => handleRoleUpdate(e)} value={currentUser.role}>
                                    <option value={'ADMIN'}>Админ</option>
                                    <option value={'CUSTOMER'}>Пользователь</option>
                                    <option value={'MANAGER'}>Менеджер</option>
                                </Form.Select>
                            </Form.Label>

                        </Form>

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion activeKey={showAccordion.activationLink} className="userRoleAccordion mt-2">
                <Accordion.Item eventKey="1">
                    <Accordion.Header onClick={() => setShowAccordion(showAccordion.activated==='1' ? {...showAccordion, activated: '0'} : {...showAccordion, activated: '1'})}><div className="text-center w-100">Активировать почту</div></Accordion.Header>
                    <Accordion.Body>
                        <Form id="UserEmailActivationForm">
                            <Form.Switch label="Активация почты" checked={currentUser.isActivated} onChange={e => handleEmailActivatedUpdate(e)} />
                        </Form>

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </section>

    );
};

export default UserAdminControl;