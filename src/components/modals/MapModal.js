import {Modal} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import React from "react";


const AdminLessons = ({onHide, show} ) => {

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
                    <h1>Карта доставок: </h1>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <iframe title="deliveryMap"
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3Adc27a5fb2cd03d7af023a2d0fc3a32ed5eace5eed4c32fbf0c16e10fc6ce0abd&amp;source=constructor"
                        width="100%" height="500" frameBorder="0"></iframe>
            </Modal.Body>
            <Modal.Footer>
                <MyButton onClick={onHide}>Закрыть</MyButton>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminLessons;