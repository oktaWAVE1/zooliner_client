import React from 'react';
import {modifyAttributeCategory
} from "../../http/admin/attributeAdminAPI";
import {Form, Modal} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";

const AdminEditAttributeCategoryModal = ({onHide, show, isMobile, currentCategory, setCurrentCategory, setUpdate}) => {
    const updateAttributeCategory = async(e) => {
        e.preventDefault()
        await modifyAttributeCategory({
            id: currentCategory.id,
            name: currentCategory.name,
            published: currentCategory.published
        }).then(() => {
            setUpdate(prev => prev+1)
            onHide()
        })
    }


    return (
        <Modal
            className='modal'
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            fullscreen={isMobile}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter ">
                    <h1>Список категорий атрибутов: </h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control className="mb-3" value={currentCategory.name} onChange={e => setCurrentCategory({...currentCategory, name: e.target.value})} />

                    <Form.Switch className="mb-3" label="Опубликовано" checked={currentCategory.published}  onChange={e => setCurrentCategory({...currentCategory, published: !currentCategory.published})} />
                    <div className="d-flex justify-content-center width-100">
                        <MyButton onClick={e => updateAttributeCategory(e)}>Сохранить изменения</MyButton>
                    </div>
                </Form>


            </Modal.Body>
            <Modal.Footer>
                <MyButton onClick={onHide}>Закрыть</MyButton>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminEditAttributeCategoryModal;