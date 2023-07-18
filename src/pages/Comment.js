import React, {useState} from 'react';
import {Alert, Container, Form, Row} from "react-bootstrap";
import MyButton from "../UI/MyButton/MyButton";
import {createComment} from "../http/commentAPI";

const Comment = () => {
    const [commentText, setCommentText] = useState('')
    const [alertMessage, setAlertMessage] = useState({title: '', message: '', show: false, variant: 'danger'})
    const [isDisabled, setIsDisabled] = useState(false)
    const sendComment = (e, com) => {
        e.preventDefault()
        createComment(com).then(data => {
            setCommentText('');
            setAlertMessage({message: "Ваш отзыв отправлен! Спасибо за Ваше мнение!", variant: 'success', show: true})
            setIsDisabled(true)
        })
    }
    return (
        <div>
            <Container>

                    <Form className='w-100'>
                        <h1 className='mt-3'>Оставь свой отыв</h1>
                        <Row className='p-2'>
                            <textarea
                                maxLength="1024"
                                className='w-100 p-2'
                                style={{minHeight: '300px'}}
                                placeholder="Писать сюда..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onSubmit={(e) => sendComment(e, commentText)}
                            />
                        </Row>
                        <Row className='p-2'>
                            <MyButton
                                disabled={isDisabled}
                                onClick={(e) => sendComment(e, commentText)}
                                >ОТПРАВИТЬ</MyButton>
                            {alertMessage.show &&
                                <Alert className='mt-2 mb-2' variant={alertMessage.variant} onClose={() => setAlertMessage({show: false})} dismissible>
                                    <Alert.Heading>{alertMessage.title}</Alert.Heading>
                                    <p>
                                        {alertMessage.message}
                                    </p>
                                </Alert>
                            }
                        </Row>
                </Form>

            </Container>
        </div>
    );
};

export default Comment;