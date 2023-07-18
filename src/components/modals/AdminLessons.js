import React, {useEffect, useState} from 'react';
import {Form, Modal, Row} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import {deleteLesson, fetchAllLessons, updateLesson} from "../../http/lessonsAPI";


import {fetchTypes} from "../../http/typeAPI";

const AdminLessons = ({onHide, show} ) => {
    const [lessons, setLessons] = useState([])
    const [unpublishedOnly, setUnpublishedOnly] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [types, setTypes] = useState({})


    useEffect(() => {
        fetchTypes().then(data => setTypes(data))
        fetchAllLessons().then(data => {
            setLessons(data);
            });

    },[show])
    const updateCurrent = (e, id, name, description, published, typeId) => {
        e.preventDefault()
        updateLesson(id, name, description, published, typeId).then(data => fetchAllLessons().then(data => {
            setLessons(data);
        }))
    }

    const deleteCurrent = (e, id, fileName) => {
        e.preventDefault()
        deleteLesson(id, fileName).then(data => fetchAllLessons().then(data => {
            setLessons(data);
        }))
    }
    const searchedLessons = []

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
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1>Управление уроками: </h1>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Check
                        type="switch"
                        id={`new-only`}
                        label="Только неопубликованные"
                        isValid={unpublishedOnly}
                        checked={unpublishedOnly}

                        onChange={() => setUnpublishedOnly(!unpublishedOnly)}
                    />
                    <Row className='p-2'>
                        <Form.Control type='text' placeholder='Поиск'
                                      value={searchQuery}
                                      onChange={e => setSearchQuery(e.target.value)}
                        />
                    </Row>

                </Form>

            </Modal.Body>
            <Modal.Footer>
                <MyButton onClick={onHide}>Закрыть</MyButton>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminLessons;