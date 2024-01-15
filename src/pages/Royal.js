import React from 'react';
import "./styles/Royal.css"
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";

const Royal = () => {
    return (
        <div className={"Royal"}>
            <div className="section">
                <div className="header-logo">
                    <img src={`${process.env.REACT_APP_API_URL}/images/royal/logo.png`} alt="" />
                </div>
            </div>

            <div className="section section--red">
                <div className="container"><a href="https://www.royalcanin.com/ru" target={"_blank"} rel="noreferrer">
                    <div className="header-title">
                        Узнать больше о ROYAL CANIN ®
                    </div>
                </a>
                </div>
            </div>

            <div className="section">
                <div className="container">
                    <div className="elements">
                        <Link className="element" to='/category/4?brand=1&attribute=%7B"3"%3A%5B63%5D%7D&query=null'>
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/circle-kitten.png`} alt="" />
                            </div>
                            <div className="element__text">
                                Корм для котят
                            </div>
                        </Link>

                        <Link className="element" to='/category/4?brand=1&attribute=%7B"3"%3A%5B62%2C64%5D%7D&query=null'>
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/circle-cat.png`} alt="" />
                            </div>
                            <div className="element__text">
                                Корм для кошек
                            </div>
                        </Link>

                        <Link className="element" to='/category/2?brand=1&attribute=%7B"4"%3A%5B67%5D%7D'>
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/circle-puppy.png`} alt="" />
                            </div>
                            <div className="element__text">
                                Корм для щенков
                            </div>
                        </Link>

                        <Link className="element" to='/category/2?brand=1&attribute=%7B"4"%3A%5B66%2C65%5D%7D'>
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/circle-dog.png`} alt="" />
                            </div>
                            <div className="element__text">
                                Корм для собак
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="section">
                <div className="container">
                    <h2>Сухой и влажный корм для котят и взрослых кошек</h2>
                    <div className="elements">
                        <div className="element">
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/cat-kitten.png`} alt="" />
                            </div>
                            <div className="element__button i1">
                                <Link to='/category/4?brand=1&attribute=%7B"3"%3A%5B63%5D%7D&query=null'>Корм для котят</Link>
                            </div>
                        </div>
                        <div className="element">
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/cat-breed.png`} alt="" />
                            </div>
                            <div className="element__button i2">
                                <a href="#">Корм для определенных пород</a>
                            </div>
                        </div>
                        <div className="element">
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/cat-daily.png`} alt="" />
                            </div>
                            <div className="element__button i3">
                                <a href="#">Корм для повседневного питания</a>
                            </div>
                        </div>
                        <div className="element">
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/cat-care.png`} alt="" />
                            </div>
                            <div className="element__button i4">
                                <a href="#">Корм для кошек с особыми потребностями</a>
                            </div>
                        </div>
                        <div className="element">
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/cat-vet.png`} alt="" />
                            </div>
                            <div className="element__button  i5">
                                <a href="#">Ветеринарные диеты для кошек</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section">
                <div className="container">
                    <h2>Сухой и влажный корм для щенков и взрослых собак</h2>
                    <div className="elements">
                        <div className="element">
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/dog-puppy.png`} alt="" />
                            </div>
                            <div className="element__button i6">
                                <Link to='/category/2?brand=1&attribute=%7B"4"%3A%5B67%5D%7D'>Корм для щенков</Link>
                            </div>
                        </div>
                        <div className="element">
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/dog-breed.png`} alt="" />
                            </div>
                            <div className="element__button i7">
                                <a href="#">Корм для определенных пород</a>
                            </div>
                        </div>
                        <div className="element">
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/dog-daily.png`} alt="" />
                            </div>
                            <div className="element__button i8">
                                <a href="#">Корм для повседневного питания</a>
                            </div>
                        </div>
                        <div className="element">
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/dog-care.png`} alt="" />
                            </div>
                            <div className="element__button i9">
                                <a href="#">Корм для собак с особыми потребностями</a>
                            </div>
                        </div>
                        <div className="element">
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/dog-vet.png`} alt="" />
                            </div>
                            <div className="element__button i10">
                                <a href="#">Ветеринарные диеты для собак</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Helmet>
                <title>Бренд зона Royal Canin | ЗооЛАЙНЕР</title>
                <meta property="og:title" content={`Бренд зона Royal Canin | ЗооЛАЙНЕР`} />

                <meta property="og:image" content={`${process.env.REACT_APP_API_URL}/images/royal/logo.png`} />

                <meta property="og:description" content="Товары для животных с доставкой в день заказа | ЗооЛАЙНЕР" />
                <meta property="og:url" content={`${process.env.REACT_APP_URL}/royal}`} />
            </Helmet>
        </div>
    );
};

export default Royal;