import React from 'react';
import cl from "./Footer.module.css"

const Footer = () => {
    const currentYear =  new Date().getFullYear()
    return (
        <footer className={cl.footer}>
            <h6>ЗооЛАЙНЕР © 2016-{currentYear} Все права защищены.</h6>
            <p>Информация на сайте размещена в ознакомительных целях и ни при каких условиях не является публичной офертой, определяемой положениями Статьи 437 ГК РФ.<br/>
                Обратите внимание: изображение товара на сайте может отличаться от фактического изображения товара.</p>
        </footer>
    );
};

export default Footer;