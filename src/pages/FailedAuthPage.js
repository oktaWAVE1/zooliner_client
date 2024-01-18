import React from 'react';
import {Link} from "react-router-dom";

const FailedAuthPage = () => {
    return (
        <div className="mt-3">
            <h2>Упс... Что-то пошло не так.</h2>
            <h2>Не удалось авторизоваться через VK. Попробуйте позже или <Link to={'/login'}>войдите</Link> при помощи email.</h2>
        </div>
    );
};

export default FailedAuthPage;