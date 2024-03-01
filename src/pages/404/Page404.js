import React from 'react';
import {useNavigate} from "react-router-dom";
import MyButton from "../../UI/MyButton/MyButton";
import {Helmet} from "react-helmet";
const Page404 = () => {
    const navigate = useNavigate()
    return (
        <div className="container_404">

            <div className="sign_404 d-flex">
                <div id="id_404_1">4</div>
                <div id="id_404_2">0</div>
                <div id="id_404_3">4</div>
            </div>
            <h2 className='h2_404'>СТРАНИЦА НЕ НАЙДЕНА</h2>
            <div className="p-3 text-center">Возможно вы ввели неправильный адрес или страница была перенесена.</div>
            <div className="d-flex"><MyButton className="btn" onClick={() => navigate("/category/0")}>ПЕРЕЙТИ В КАТАЛОГ</MyButton></div>
            <Helmet>
                <meta name="robots" content="noindex"/>
                <title>Страница не найдена | Зоолайнер</title>
            </Helmet>

        </div>
    );
};

export default Page404;