import React, {useEffect, useState} from 'react';
import {Accordion, Form, Modal} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import {useIsMobile} from "../../hooks/useIsMobile";
import {createPromotion, fetchPromotions, setPromotionIndex} from "../../http/admin/promotionAdminAPI";
import {Link} from "react-router-dom";
import AdminEditPromotionModal from "./AdminEditPromotionModal";

const AdminPromotionsModal = ({onHide, show}) => {
    const isMobile = useIsMobile()
    const [showModal, setShowModal] = useState(false);
    const [promotions, setPromotions] = useState([]);
    const [currentPromotion, setCurrentPromotion] = useState({description: '', link: '', index: 0, validSince: '', validUntil: ''});
    const [file, setFile] = useState('');
    const [update, setUpdate] = useState(0);
    const [promotionToChange, setPromotionToChange] = useState({description: '', link: '', index: 0, validSince: '', validUntil: '', id: ''});

    const addPromotion = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        for (const [key, value] of Object.entries(currentPromotion)) {
            formData.append(`${key}`, `${value}`)
        }
        if (file){
            formData.append('file', file[0])
        }
        await createPromotion(formData).then(() => {
            setUpdate(prev => prev+1)
            setCurrentPromotion({description: '', link: '', index: 0, validSince: '', validUntil: ''})
            setFile('')
        })
    }
    const selectFile = e => {
        setFile(e.target.files)
    }

    const editPromotion = (e, promotion) => {
        e.preventDefault()
        setPromotionToChange(promotion)
        setShowModal(true)
    }

    const handleChangeIndex = async (e, id) => {
        e.preventDefault()
        await setPromotionIndex({id, index: e.target.value}).then(() => setUpdate(prev => prev+1))
    }

    useEffect(() => {
        fetchPromotions().then(data => {
            setPromotions(data)
        })
    }, [update]);
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
                <Modal.Title id="contained-modal-title-vcenter ">
                    <h3>Список акций на главной: </h3>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <AdminEditPromotionModal show={showModal} onHide={() => setShowModal(false)} isMobile={isMobile} promotion={promotionToChange} setPromotion={setPromotionToChange} setUpdate={setUpdate} />
                <Accordion className="addPromotionAccordion mb-3">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><div style={{color: "white", textAlign: "center", width: "100%"}}>Добавить акцию</div></Accordion.Header>
                        <Accordion.Body>
                            <Form id='AdminPromotionForm' className="d-flex flex-column justify-content-center">
                                <Form.Label>
                                    <div>Описание</div>
                                    <Form.Control placeholder="Описание" type='text' value={currentPromotion.description} onChange={e => setCurrentPromotion({...currentPromotion, description: e.target.value})} />
                                </Form.Label>
                                <Form.Label>
                                    <div>Ссылка</div>
                                    <Form.Control placeholder="Ссылка" type='text' value={currentPromotion.link} onChange={e => setCurrentPromotion({...currentPromotion, link: e.target.value})} />
                                </Form.Label>
                                <Form.Label>
                                    <div>Порядковый номер</div>
                                    <Form.Control placeholder="Порядок" type='number' value={currentPromotion.index} onChange={e => setCurrentPromotion({...currentPromotion, index: e.target.value})} />
                                </Form.Label>
                                <Form.Label>
                                    <div>Действует с</div>
                                    <Form.Control placeholder="Действует с" type="date" value={currentPromotion.validSince} onChange={e => setCurrentPromotion({...currentPromotion, validSince: e.target.value})} />
                                </Form.Label>
                                <Form.Label>
                                    <div>Действует до</div>
                                    <Form.Control placeholder="Действует до" type="date" value={currentPromotion.validUntil} onChange={e => setCurrentPromotion({...currentPromotion, validUntil: e.target.value})} />
                                </Form.Label>
                                <Form.Label>
                                    <div>Изображение</div>
                                <Form.Control accept={"image/*"} type="file" className="mb-2" multiple={false} onChange={selectFile} placeholder="Выберите изображение" />
                                </Form.Label>
                                <MyButton onClick={e => addPromotion(e)}>ДОБАВИТЬ</MyButton>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                {promotions?.length>0 &&
                    <table className="w-100">
                        <thead className="w-100">
                        <tr>
                            <td><strong>id</strong></td>
                            <td className='text-center'><strong>Описание</strong></td>
                            <td></td>
                            <td className='text-center'><strong>Дествует с</strong></td>
                            <td className='text-center'><strong>Дествует до</strong></td>
                            <td className='text-center'><strong>Порядок</strong></td>
                            <td className='text-center'><strong>Ссылка</strong></td>
                        </tr>

                        </thead>
                        <tbody>

                        {promotions.map(p =>

                            <tr key={p.id} className="my-2">
                                <td onClick={(e) => editPromotion(e, p)} className="pointer">{p?.id}</td>
                                <td onClick={(e) => editPromotion(e, p)} className='text-center pointer'>{p?.description}</td>
                                <td onClick={(e) => editPromotion(e, p)} className='text-center pointer'><img style={{width: "100px"}} alt="promotion_img" className="promotionImg" src={`${process.env.REACT_APP_API_URL}/images/promotions/mini/${p.img}`} /></td>
                                <td className='text-center'>{p.validSince}</td>
                                <td className='text-center'>{p.validUntil}</td>
                                <td className='text-center'>
                                    <Form name="FormAdminPromotionIndex text-center w-100">
                                        <div className='text-center w-100 d-flex justify-content-center'>
                                            <Form.Control className="text-center my-1" style={{width: "50px"}} type="number" value={p.index} onChange={e => handleChangeIndex(e, p.id)} />
                                        </div>
                                    </Form>
                                </td>
                                <td className='text-center'>{p.link?.length>0 && <Link to={p.link}>Ссылка</Link>}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                }
            </Modal.Body>
            <Modal.Footer>
                <MyButton onClick={onHide}>Закрыть</MyButton>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminPromotionsModal;