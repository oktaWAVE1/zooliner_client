import React, {useEffect, useState} from 'react';
import {Form, Modal, Row} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import {deleteComment, fetchAllComments, updateComment} from "../../http/commentAPI";
import {useCommentSortSearch} from "../../hooks/useCommentSortSearch";

const AdminComments = ({onHide, show, setUnread} ) => {
    const [comments, setComments] = useState([])
    const [newOnly, setNewOnly] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        fetchAllComments().then(data => {
            setComments(data.comments);
            setUnread(data.unreadComs);
        });

    },[])
    const update = (e, id, viewed, published) => {
        e.preventDefault()
        updateComment(id, viewed, published).then(data => fetchAllComments().then(data => {
            setComments(data.comments);
            setUnread(data.unreadComs);
        }))
    }

    const deleteCurrent = (e, id) => {
        e.preventDefault()
        deleteComment(id).then(data => fetchAllComments().then(data => {
            setComments(data.comments);
            setUnread(data.unreadComs);
        }))
    }

    const searchedComments = useCommentSortSearch(comments, searchQuery, newOnly)
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
                    <h1>Управление отызвами: </h1>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Check
                        type="switch"
                        id={`new-only`}
                        label="Только новые"
                        isValid={newOnly}
                        checked={newOnly}

                        onChange={() => setNewOnly(!newOnly)}
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

export default AdminComments;