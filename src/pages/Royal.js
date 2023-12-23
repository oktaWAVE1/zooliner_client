import React from 'react';
import "./styles/Royal.css"
import {Helmet} from "react-helmet";

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
                        <a className="element" href="#">
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/circle-kitten.png`} alt="" />
                            </div>
                            <div className="element__text">
                                Корм для котят
                            </div>
                        </a>

                        <a className="element" href="#">
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/circle-cat.png`} alt="" />
                            </div>
                            <div className="element__text">
                                Корм для кошек
                            </div>
                        </a>

                        <a className="element" href="#">
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/circle-puppy.png`} alt="" />
                            </div>
                            <div className="element__text">
                                Корм для щенков
                            </div>
                        </a>

                        <a className="element" href="#">
                            <div className="element__image">
                                <img src={`${process.env.REACT_APP_API_URL}/images/royal/circle-dog.png`} alt="" />
                            </div>
                            <div className="element__text">
                                Корм для собак
                            </div>
                        </a>
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
                                <a href="#">Корм для котят</a>
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
                                <a href="#">Корм для щенков</a>
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
            </Helmet>
        </div>
    );
};

export default Royal;