import React, {useContext, useState} from 'react';
import {Form, Card, Container, Alert} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Link, useLocation} from "react-router-dom";
import MyButton from "../UI/MyButton/MyButton";
import {login, registration} from "../http/userAPI";
import {validate} from "email-validator";
import {Helmet} from "react-helmet";
import MyPhoneInput from "../UI/MyPhoneInput/MyPhoneInput";
import Loader from "../UI/Loader/Loader";


const Auth = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [telephoneToggle, setTelephoneToggle] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        name: '', email: '', telephone: '', password: '', passwordConfirm: ''
    })
    const [alertMessage, setAlertMessage] = useState({title: '', message: '', show: false, variant: 'danger'})

    const location = useLocation()
    const isLogin = location.pathname === "/login"
    const doAuth = async (event) => {
        event.preventDefault();
        try {
            if (isLogin){
                    setIsDisabled(false)
                    await login(
                        {telephone: currentUser.telephone,
                        email:currentUser.email,
                        password: currentUser.password}).then(data => user.setUser(data))
                if(user.user.role) {
                    user.setIsAuth(true)
                }
            }
            else{
                if (!validate(currentUser.email)){
                    setAlertMessage({message: 'Вы ввели некорректный email', show: true, variant: 'danger'})
                } else if (currentUser.password!==currentUser.passwordConfirm){
                    setAlertMessage({message: 'Пароли не совпадают', show: true, variant: 'danger'})
                } else {
                    setLoading(true)
                    await registration(currentUser.name, currentUser.telephone, currentUser.email, currentUser.password).then(data => {
                            setAlertMessage({
                                message: 'На ваш Email отправлено письмо с подтверждением регистрации. Пожалуйста пройдите по ссылке в письме.',
                                show: true,
                                variant: 'success'
                            });
                            setIsDisabled(true)
                        }
                    ).finally(() => setLoading(false))
                }
            }

    } catch (e) {
            setAlertMessage({message: e.response.data.message, show: true, variant: 'danger'})
    }
    }
    if (loading){
        return <Loader />
    }

    return (
        <Container className="loginPage">
            <Card>
                <Form onSubmit={doAuth} className='auth_form'>
                    <h1>{isLogin ? 'Войти' : 'Регистрация'}</h1>
                    {alertMessage.show &&
                        <Alert variant={alertMessage.variant} onClose={() => setAlertMessage({show: false})} dismissible>
                            <Alert.Heading>{alertMessage.title}</Alert.Heading>
                            <p>
                                {alertMessage.message}
                            </p>
                        </Alert>
                    }
                    {isLogin &&
                        <div className="d-flex justify-content-center" onChange={() => setIsDisabled(false)}>
                            <Form.Switch isValid={true} checked={telephoneToggle} onChange={() => setTelephoneToggle(prev => !prev)} label="войти по телефону" />

                        </div>
                    }
                    {!isLogin &&
                        <Form.Control

                            value={currentUser.name}
                            onChange={e => setCurrentUser({...currentUser, name: e.target.value})}
                            placeholder='Имя'
                            type='text'
                        />}
                    {(!isLogin || (isLogin && telephoneToggle)) &&
                        <MyPhoneInput value={currentUser.telephone} onChange={e => setCurrentUser({...currentUser, telephone: e.target.value})} />

                    }
                    { (!telephoneToggle || !isLogin) &&
                        <Form.Control
                            value={currentUser.email}
                            onChange={e => setCurrentUser( {...currentUser, email: e.target.value})}
                            placeholder={'Email'}
                            type='text'
                        />
                    }
                    <Form.Control
                        value={currentUser.password}
                        onChange={e => setCurrentUser({...currentUser, password: e.target.value})}
                        placeholder='Пароль'
                        type='password'
                    />
                    {!isLogin &&
                        <Form.Control
                            value={currentUser.passwordConfirm}
                            onChange={e => setCurrentUser({...currentUser, passwordConfirm: e.target.value})}
                            placeholder='Еще раз пароль'
                            type='password'
                            title={currentUser.passwordConfirm!==currentUser.password ? 'Пароли не совпадают' : ''}
                            className={currentUser.passwordConfirm!==currentUser.password && 'pass_dont_match'}
                        />
                    }
                    <MyButton
                    disabled={isDisabled}
                    type='submit'
                    >
                        {isLogin? "ВОЙТИ" : "ЗАРЕГИСТРИРОВАТЬСЯ"}
                    </MyButton>
                    <div className="switch">{isLogin ? 'Нет аккаунта?' : 'Уже зарегестрированы?'}
                        {isLogin ?
                            <Link to='/reg' onClick={() => {
                                setCurrentUser({email:'', name: '', telephone: '', password: ''})
                                setAlertMessage({title: '', message: '', show: false, variant: 'danger'})
                                setIsDisabled(false)
                            }}> Регистрация.</Link>
                            :
                            <Link to='/login' onClick={() => {
                                setCurrentUser({email:'', name: '', telephone: '', password: ''})
                                setIsDisabled(false)
                                setAlertMessage({title: '', message: '', show: false, variant: 'danger'})
                            }}> Войти.</Link>
                        }
                        {isLogin &&
                            <div>Забыли пароль?<Link to='/reset_pass'> Восстановить.</Link></div>
                        }
                        </div>


                </Form>
            </Card>
            <Helmet>
                <title>Страница аутентефикации | ЗооЛАЙНЕР</title>
            </Helmet>
        </Container>
    );
});

export default Auth;