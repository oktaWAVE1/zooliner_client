import React, {useEffect, useState} from 'react';
import {Accordion, Button, Card, Container, Form, Modal, Row} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import {createType, deleteType, fetchTypes, updateType} from "../../http/typeAPI";

const CreateType = ({onHide, show}) => {
    const [type, setType] = useState('')
    const [types, setTypes] = useState([{id:'', name: ''}])
    const [modType, setModType] = useState('')
    const addType = (e) => {
        e.preventDefault()
        createType(type).then(data => {
            setType('');
            fetchTypes().then(data => setTypes(data));
        })

    }
    useEffect(() => {
        fetchTypes().then(data => setTypes(data))
    },[show])
    const modifyType = (name, id) => {
        updateType(name, id).then(data => fetchTypes().then(data => setTypes(data)))
    }
    const deleteCurrent = (id) => {
        deleteType(id).then(data => fetchTypes().then(data => setTypes(data)))
    }

    return (
        <Modal
            className='modal'
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter ">
                    <h1>Добавить тип урока: </h1>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
               <Form>

                   <Row className='p-2'>
                   <Form.Control type='text' placeholder='Название нового типа'
                        value={type}
                        onChange={e => setType(e.target.value)}
                   />
                   </Row>
                   <Row className='p-2'>
                   <Button disabled={type===''} onClick={(e) => addType(e)} className='classic_btn'>ДОБАВИТЬ</Button>
                   </Row>

               </Form>
                </Container>
            <Container>

                    <Accordion>
                    {types.map(t =>

                                <Accordion.Item key={t.id} eventKey={t.id}>
                                    <Accordion.Header className='classic_btn'>{t.name}</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="d-flex justify-content-sm-between modifyType">
                                            <input className="w-50" type='text' placeholder='Изменить название...' value={modType} onChange={e => setModType(e.target.value)} />
                                            <MyButton onClick={() => modifyType(t.id, modType)}>Изменить</MyButton>
                                            <MyButton onClick={() => deleteCurrent(t.id)}>Удалить тип</MyButton>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>

                    )}
                    </Accordion>

            </Container>

            </Modal.Body>
            <Modal.Footer>
                <MyButton onClick={onHide}>Закрыть</MyButton>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;