import React, {useEffect, useState} from 'react';
import {Button, Container, Dropdown, Form, Modal, Row} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import {createLesson} from "../../http/lessonsAPI";


const CreateLesson = ({onHide, show}) => {
    const [lesson, setLesson] = useState({name: '', description: '', lessonTypeId: '', typeName: ''})
    const [types, setTypes] = useState([{id:'', name: ''}])
    const [file, setFile] = useState(null)

    const selectFile = e => {
        setFile(e.target.files[0])
    }



    const addLesson = () => {
        try {
            const formData = new FormData()
            for (const [key, value] of Object.entries(lesson)) {
                formData.append(`${key}`, `${value}`)
            }
            formData.append('file', file)


            createLesson(formData).then(data => setLesson({name: '', description: '', lessonTypeId: '', typeName: ''}))

            onHide()
        } catch (e) {
            alert(e.response.data.message)
        }

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
                    <h1>Добавить урок: </h1>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form>
                        <Row className='p-2 d-flex flex-row justify-content-between'>

                            <Form.Control onChange={selectFile} placeholder="Выберите видео с уроком" type="file" />

                        </Row>
                        <Row className='p-2'>
                            <Form.Control type='text' placeholder='Название урока...'

                                          value={lesson.name}
                                          onChange={e => setLesson({...lesson, name: e.target.value})}
                            />
                            <textarea
                                className='mt-2'
                                style={{minHeight: 150}}
                                type='text' placeholder='Описание...'
                                value={lesson.description}
                                onChange={e => setLesson({...lesson, description: e.target.value})}
                            />
                        </Row>
                        <Row className='p-2'>
                            <Button
                                onClick={addLesson}
                                className='classic_btn'
                                disabled={lesson.name==='' || lesson.description==='' || lesson.typeName==='' || file===null}
                            >ДОБАВИТЬ УРОК</Button>
                        </Row>

                    </Form>
                </Container>
                <Container>



                        <Row md={12} className='d-flex mt-3 flex-row gap-3'>
                            <Dropdown className="d-flex w-auto p-0" style={{width: "45%"}}>
                                <Dropdown.Toggle>{lesson.typeName ? lesson.typeName :"Выберите тип:"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {types.length>=1 && types.map(t =>
                                        <Dropdown.Item onClick={(e) => setLesson({...lesson, typeName: t.name, lessonTypeId: t.id})} key={t.id}>{t.name} </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>

                            </Dropdown>

                        </Row>


                </Container>

            </Modal.Body>
            <Modal.Footer>
                <MyButton onClick={onHide}>Закрыть</MyButton>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateLesson;