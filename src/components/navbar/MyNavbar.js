import React, {useContext} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import cl from './MyNavbar.module.css'
import {Link, NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {userLogout} from "../../http/userAPI";



const MyNavbar = observer(() => {
    const {user} = useContext(Context)
    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        userLogout()
    }

    return (
        <div>
            <Navbar className={cl.navbar} collapseOnSelect expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand><Link to='/'>
                            <img alt='logo' src={process.env.REACT_APP_API_URL+'/images/logo_main_mini.webp'} className={cl.navbarlogo}/>
                    </Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className={cl.navbarItem} to='/payment_and_delivery'>Оплата и доставка</NavLink>
                            <NavLink className={cl.navbarItem} to='/bonus'>Бонусная программа</NavLink>
                        </Nav>


                            {user.isAuth && <Nav className='align-items-center'>
                                {user.user.role === 'ADMIN' &&
                                    <NavLink className={cl.navbarItem} to='/admin'>Админ</NavLink>
                                }
                                <NavLink className={cl.navbarItem} to='/user'>Аккаунт</NavLink>
                                <div onClick={() => logout()} className={cl.logout_btn}>Выйти</div>
                            </Nav>
                            }
                            {!user.isAuth &&
                                <Nav>

                                    <NavLink className={cl.navbarItem} to='/login'>Авторизация</NavLink>

                                </Nav>
                            }

                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    );
});

export default MyNavbar;