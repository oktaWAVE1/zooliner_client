import React from 'react';
import MyButton from "../UI/MyButton/MyButton";
import {useNavigate} from "react-router-dom";

const SuccessPage = () => {
    const navigate = useNavigate()
    return (
        <div>

            <div className="successImg">
                <div>
                    <h1>Заказ успешно отправлен!</h1>
                    <MyButton  onClick={() => navigate("/")}>ПЕРЕЙТИ НА ГЛАВНУЮ</MyButton>
                </div>
                <div>
                    <img alt='doggy'  src={`${process.env.REACT_APP_API_URL}/images/successPage.png`} />
                </div>

            </div>

        </div>
    );
};

export default SuccessPage;