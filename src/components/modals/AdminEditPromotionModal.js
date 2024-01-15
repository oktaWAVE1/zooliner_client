import React, {useState} from 'react';

import {Form, Modal} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import {createPromotion, deletePromotion, updatePromotion} from "../../http/admin/promotionAdminAPI";

const AdminEditPromotionModal = ({onHide, show, isMobile, promotion, setPromotion, setUpdate}) => {

    const [file, setFile] = useState('');

    const handleUpdatePromotion = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        for (const [key, value] of Object.entries(promotion)) {
            if(key!=='img'){
                formData.append(`${key}`, `${value}`)
            }
        }
        if (file){
            formData.append('file', file[0])
        }
        await updatePromotion(formData).then(() => {
            setUpdate(prev => prev+1)
            onHide()
        })
    }
    const selectFile = e => {
        setFile(e.target.files)
    }

    const handleDeletePromotion = async() => {
        await deletePromotion(promotion.id).then(() => {
            setUpdate(prev => prev+1)
            onHide()
        })

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
                <Modal.Title id="contained-modal-title-vcenter ">
                        <h3>Редактирование акции: </h3>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-end w-100">
                    <MyButton style={{fontSize: "0.8rem", padding: "2px 12px", marginLeft: "100px"}} onClick={() => handleDeletePromotion()}>УДАЛИТЬ</MyButton>
                </div>
                <Form className="row">
                    <Form.Label>
                        <div>Описание</div>
                        <Form.Control placeholder="Описание" type='text' value={promotion.description} onChange={e => setPromotion({...promotion, description: e.target.value})} />
                    </Form.Label>
                    <Form.Label>
                        <div>Ссылка</div>
                        <Form.Control placeholder="Ссылка" type='text' value={promotion.link} onChange={e => setPromotion({...promotion, link: e.target.value})} />
                    </Form.Label>
                    <Form.Label>
                        <div>Порядковый номер</div>
                        <Form.Control placeholder="Порядок" type='number' value={promotion.index} onChange={e => setPromotion({...promotion, index: e.target.value})} />
                    </Form.Label>
                    <Form.Label>
                        <div>Действует с</div>
                        <Form.Control placeholder="Действует с" type="date" value={promotion.validSince} onChange={e => setPromotion({...promotion, validSince: e.target.value})} />
                    </Form.Label>
                    <Form.Label>
                        <div>Действует до</div>
                        <Form.Control placeholder="Действует до" type="date" value={promotion.validUntil} onChange={e => setPromotion({...promotion, validUntil: e.target.value})} />
                    </Form.Label>
                    <Form.Label>
                        <div>Изменить изображение</div>
                        <Form.Control accept={"image/*"} type="file" className="mb-2" multiple={false} onChange={selectFile} placeholder="Выберите изображение" />
                    </Form.Label>
                    <img style={{width: "100%"}} alt="promotion_img" className="promotionImg mb-3" src={`${process.env.REACT_APP_API_URL}/images/promotions/${promotion?.img}`} />
                    <MyButton onClick={e => handleUpdatePromotion(e)}>СОХРАНИТЬ ИЗМЕНЕНИЯ</MyButton>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <MyButton onClick={onHide}>Закрыть</MyButton>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminEditPromotionModal;