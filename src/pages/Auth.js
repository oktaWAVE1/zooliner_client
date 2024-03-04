import React, {useContext, useState, Suspense, useEffect} from 'react';
import {Form, Card, Container, Alert} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Link, useLocation, useNavigate} from "react-router-dom";
import MyButton from "../UI/MyButton/MyButton";
import {login, registration, userResendActivationLink} from "../http/userAPI";
import {validate} from "email-validator";
import {Helmet} from "react-helmet";
import Loader from "../UI/Loader/Loader";

const MyPhoneInput = React.lazy(() => import('../UI/MyPhoneInput/MyPhoneInput'));
const SocialAuth = React.lazy(() => import('../components/features/SocialAuth'));

const Auth = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [personalData, setPersonalData] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false)
    const [telephoneToggle, setTelephoneToggle] = useState(false);
    const [resendLink, setResendLink] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        name: '', email: '', telephone: '', password: '', passwordConfirm: ''
    })
    const [alertMessage, setAlertMessage] = useState({title: '', message: 'Аккаунты пользователей были перенесены со старого сайта, пароли сброшены. Пожалуйста, воспользуйтесь функцией восстановления пароля! Если возникнут проблемы, мы будем рады помочь Вам с восстановлением.', show: true, variant: 'warning'})
    useEffect(() => {
        if (user.isAuth) {
            navigate('/')
        }
    }, [user.isAuth]);
    const location = useLocation()
    const isLogin = location.pathname === "/login"
    const resendActivationLink = async() =>{
        setLoading(true)
        await userResendActivationLink(currentUser.email).then(data => {
            setResendLink(false)
            setAlertMessage({message: data, show: true, variant: 'success'})
        }).finally(() => setLoading(false))
    }
    const doAuth = async (event) => {
        event.preventDefault();
        try {
            if (isLogin){

                    setIsDisabled(false)
                    await login(
                        {telephone: currentUser.telephone,
                        email:currentUser.email,
                        password: currentUser.password}).then(data =>
                    {
                        console.log(data)
                        user.setUser(data)
                        if(data.role) {
                            user.setIsAuth(true)
                        }
                    })
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
                    ).finally(() => {
                        setLoading(false)
                    })
                }
            }

    } catch (e) {
            console.log(e)
            if(e?.response?.status===423){
                setResendLink(true)
                setAlertMessage(
                    {
                        message:e.response.data.message,
                        show: true,
                        variant: 'danger'})
            } else {
                setAlertMessage({message: e.response?.data?.message, show: true, variant: 'danger'})
            }
    }
    }
    if (loading){
        return <Loader />
    }

    return (
        <Container className="loginPage">
            <Card>
                <Form id="SubmitLoginForm" onSubmit={doAuth} className='auth_form'>
                    <h1>{isLogin ? 'Войти' : 'Регистрация'}</h1>
                    {alertMessage.show &&
                        <Alert variant={alertMessage.variant} onClose={() => setAlertMessage({show: false})} dismissible>
                            <Alert.Heading>{alertMessage.title}</Alert.Heading>
                            <p className={'mb-1'}>
                                {alertMessage.message}
                            </p>
                            {resendLink && <p className="pointer mb-0 pb-0" style={{color: "blueviolet"}} onClick={() => resendActivationLink()}>Запросить новую ссылку активации</p>}
                        </Alert>
                    }
                    {isLogin &&
                        <div className="d-flex justify-content-center" onChange={() => setIsDisabled(false)}>
                            <Form.Switch isValid={true} checked={telephoneToggle} onChange={() => setTelephoneToggle(prev => !prev)} label="войти по номеру телефона" />

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
                        <Suspense fallback={<Loader />}>
                            <MyPhoneInput value={currentUser.telephone} onChange={e => setCurrentUser({...currentUser, telephone: e.target.value})} />
                        </Suspense>

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
                        <>
                            <Form.Control
                                value={currentUser.passwordConfirm}
                                onChange={e => setCurrentUser({...currentUser, passwordConfirm: e.target.value})}
                                placeholder='Еще раз пароль'
                                type='password'
                                title={currentUser.passwordConfirm!==currentUser.password ? 'Пароли не совпадают' : ''}
                                className={currentUser.passwordConfirm!==currentUser.password && 'pass_dont_match'}
                            />
                            <Form.Label className="px-3 d-flex gap-3 justify-content-center align-items-start">
                                <Form.Check checked={personalData} onChange={() => setPersonalData(prev => !prev)} />
                                <span style={{fontSize: "0.8rem", paddingTop: "2px"}} className="text-center">соглашаюсь с <Link to='/personal_data' target="_blank">полилитикой обработки персональных данных</Link></span>
                            </Form.Label>
                        </>

                    }
                    <MyButton
                    disabled={isLogin ? isDisabled : (isDisabled || !personalData)}
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
                <Suspense fallback={<Loader/>}>
                    <SocialAuth isLogin={isLogin} />
                </Suspense>
            </Card>
            <Helmet>
                <title>Страница аутентефикации | ЗооЛАЙНЕР</title>
            </Helmet>
        </Container>
    );
});

export default Auth;