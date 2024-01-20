import React, {useEffect, useState} from 'react';
import {useIsMobile} from "../../hooks/useIsMobile";
import {Accordion, Container, Form, Modal} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import Delete from "../../UI/svgs/delete";

import {
    createAttribute,
    createAttributeCategory,
    deleteAttribute,
    deleteAttributeCategory, fetchAllAttributes
} from "../../http/admin/attributeAdminAPI";
import AdminEditAttributeCategoryModal from "./AdminEditAttributeCategoryModal";

const AdminAttributeModal = ({onHide, show}) => {
    const [category, setCategory] = useState('')
    const [attribute, setAttribute] = useState('');
    const [categories, setCategories] = useState([])
    const isMobile = useIsMobile()
    const [currentCategory, setCurrentCategory] = useState({name: '', published: false});
    const [showModal, setShowModal] = useState(false);
    const [update, setUpdate] = useState(1);

    const addAttributeCategory = async (e) => {
        e.preventDefault()
        await createAttributeCategory(category).then(async () => {
            setCategory('');
            await fetchAllAttributes().then(data => setCategories(data))
        })
    }

    const addAttribute = async (e, productAttributeCategoryId) => {
        e.preventDefault()
        await createAttribute({productAttributeCategoryId, value: attribute}).then(async () => {
            setAttribute('');
            await fetchAllAttributes().then(data => setCategories(data))
        })
    }

    const delAttribute = async (id) => {
        await deleteAttribute(id).then(async () => {
            await fetchAllAttributes().then(data => setCategories(data))
        })
    }

    const delAttributeCategory = async (id) => {
        await deleteAttributeCategory(id).then(async () => {
            await fetchAllAttributes().then(data => setCategories(data))
        })
    }

    const selectCategory = (category) => {
        setCurrentCategory(category)
        setShowModal(true)
    }

    useEffect(() => {
        fetchAllAttributes().then(data => {
            setCategories(data)
        })
    },[show, update])



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
                <Container>
                    <Accordion className="addAttributeCategoryAccordion mb-3">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><div style={{color: "white", textAlign: "center", width: "100%"}}>Добавить категорию</div></Accordion.Header>
                            <Accordion.Body>
                                <Form id='AdminBrandForm' className="d-flex flex-column justify-content-center">
                                    <Form.Control placeholder="Название категории" className="mb-2" type='text' value={category} onChange={e => setCategory( e.target.value)} />
                                    <MyButton disabled={category.length<1} onClick={e => addAttributeCategory(e)}>ДОБАВИТЬ</MyButton>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>

                <Container>
                    <AdminEditAttributeCategoryModal
                        currentCategory={currentCategory}
                        setCurrentCategory={setCurrentCategory}
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        isMobile={isMobile}
                        setUpdate={setUpdate}
                        />

                        {categories?.length>0 &&
                        <Accordion className="listAttributeCategoryAccordion">
                            {categories.map(c =>
                                <Accordion.Item eventKey={c.id} key={c.id}>
                                    <Accordion.Header><div className="py-0" style={{color: "white", textAlign: "center", width: "100%"}}>{c.name}</div></Accordion.Header>
                                    <Accordion.Body>
                                        <div className="d-flex justify-content-end w-100 gap-1 mb-2">
                                            <MyButton onClick={() => selectCategory(c)} classes="py-1 mb-2">Изменить категорию</MyButton>
                                            <MyButton onClick={() => delAttributeCategory(c.id)} classes="py-1 mb-2">Удалить категорию</MyButton>
                                        </div>
                                        <Accordion className="addAttributeCategoryAccordion mb-3">
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header><div style={{color: "white", textAlign: "center", width: "100%"}}>Добавить атрибут</div></Accordion.Header>
                                                <Accordion.Body>
                                                    <Form id='AdminBrandForm' className="d-flex flex-column justify-content-center">
                                                        <Form.Control placeholder="Название аттрибута" className="mb-2" type='text' value={attribute} onChange={e => setAttribute( e.target.value)} />
                                                        <MyButton disabled={attribute.length<1} onClick={e => addAttribute(e, c.id)}>ДОБАВИТЬ</MyButton>
                                                    </Form>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                        {c?.product_attributes?.length>0 &&
                                            c.product_attributes.sort((a, b) => a.value-b.value).map(pa =>
                                                <div style={{borderBottom: "solid #777 1px"}} key={pa.id} className="attributeItem d-flex justify-content-between">
                                                    <div>
                                                        {pa.value}
                                                    </div>
                                                    <div>
                                                        <span onClick={() => delAttribute(pa.id)} className="pointer"><Delete /></span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </Accordion.Body>
                                </Accordion.Item>
                            )}
                        </Accordion>
                    }



                </Container>

            </Modal.Body>
            <Modal.Footer>
                <MyButton onClick={onHide}>Закрыть</MyButton>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminAttributeModal;