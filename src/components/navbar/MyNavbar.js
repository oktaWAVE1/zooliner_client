import React, {useContext, useRef, useState} from 'react';
import {Accordion, Container, Nav, Navbar} from "react-bootstrap";
import cl from './MyNavbar.module.css'
import {Link, NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {userLogout} from "../../http/userAPI";
import SearchBar from "../search/SearchBar";
import {useIsMobile} from "../../hooks/useIsMobile";
import Login from "../../UI/svgs/login";
import ShoppingCart from "../../UI/svgs/shoppingCart";
import Logout from "../../UI/svgs/logout";
import Person from "../../UI/svgs/person";
import Admin from "../../UI/svgs/admin";



const MyNavbar = observer(() => {
    const {user, catalogue, loading, basket} = useContext(Context)
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false);
    const logout = () => {
        userLogout().then(() => {
            user.setUser({})
            user.setIsAuth(false)
            localStorage.removeItem('token')
            hideMobileMenu()
            navigate('/')
        })
    }
    const isMobile = useIsMobile()
    const menuRef = useRef(null)
    const togglerRef = useRef(null)
    const hideMobileMenu = () => {
        loading.setLoading(true)
        if(isMobile){
            const mobileMenu = menuRef.current
            mobileMenu.className = 'navbar-collapse collapse'
            const toggler = togglerRef.current
            toggler.className = "navbar-toggler collapsed"
            setExpanded(prev => !prev)
        }
    }

    return (
        <header>
            <Navbar className={cl.navbar} expanded={expanded} expand="lg" variant="dark">
                <Container className={cl.container}>
                    <SearchBar className="ms-1" />
                    <Navbar.Brand><Link to='/'>
                        <img alt='logo' src={process.env.REACT_APP_API_URL+'/images/logo_main_mini.webp'} className={cl.navbarlogo}/>
                    </Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"  ref={togglerRef} onClick={() => setExpanded(expanded ? false : "expanded")} />
                    <Navbar.Collapse id="responsive-navbar-nav" ref={menuRef}>
                        <Nav className='mobileCatalogue'>
                            <Accordion>
                                <Accordion.Item eventKey={'catalogue'}>
                                    <Accordion.Header className='mobileMenuCatalogue'>
                                        <NavLink onClick={hideMobileMenu} to={`/category/0`}>Каталог</NavLink>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {catalogue.catalogue.length>0 &&
                                            catalogue.catalogue.filter(category => category.categoryId===0).map(category =>
                                                <Accordion key={category.id}>
                                                    <Accordion.Item className="category" eventKey={category.id}>
                                                        <Accordion.Header>
                                                            <NavLink onClick={hideMobileMenu} to={`/category/${category.id}`}>{category.name}</NavLink>
                                                        </Accordion.Header><div className="mobileMenuSubcategories">
                                                        {category.children && category.children.map(subCategory =>
                                                            <NavLink onClick={hideMobileMenu} key={subCategory.id}  to={`/category/${subCategory.id}`}><Accordion.Body className="mobileMenuSubcategory" key={subCategory.id}>
                                                                {subCategory.name}
                                                            </Accordion.Body></NavLink>


                                                        )}
                                                    </div>



                                                    </Accordion.Item>
                                                </Accordion>
                                            )
                                        }
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>


                        </Nav>
                        <Nav className="me-auto">
                            <Link className={cl.navbarItem} onClick={hideMobileMenu} to='/contacts'>Контакты</Link>
                            <Link className={cl.navbarItem} onClick={hideMobileMenu} to='/payment_and_delivery'>Оплата и доставка</Link>
                            <Link className={cl.navbarItem} onClick={hideMobileMenu} to='/bonus'>Бонусы</Link>

                        </Nav>

                            {user.isAuth && <Nav className="d-flex justify-content-center align-items-start logoButtons">

                                {user.user.role === 'ADMIN' &&
                                            <NavLink onClick={hideMobileMenu} className={cl.navbarItem}
                                                     to='/admin' title="Админка">
                                                {isMobile ? "Админка" :
                                                    <div>
                                                        <Admin />
                                                    </div>
                                                }
                                            </NavLink>

                                }
                                <NavLink className={cl.navbarItem} onClick={hideMobileMenu} to='/basket' alt="Корзина" title="Корзина">
                                    {isMobile ? "Корзина" :
                                        <div className="position-relative">
                                            <ShoppingCart />
                                            <span className={basket.basketItems?.length > 0 && 'navigationBasketCounter'}>
                                                {basket.basketItems?.length > 0 && basket.basketItems?.length}</span>
                                        </div>
                                    }
                                </NavLink>
                                <NavLink onClick={hideMobileMenu} className={cl.navbarItem} to='/user' title='Личный кабинет'>
                                    {isMobile ? "Личный кабинет" :
                                        <div>
                                            <Person />
                                        </div>
                                    }
                                </NavLink>
                                <div onClick={() => logout()} className={[cl.logout_btn, cl.navbarItem].join(" ")}>
                                    {isMobile ? "Выход":
                                    <div title='Выход'>
                                        <Logout />
                                    </div>

                                }
                                </div>

                            </Nav>
                            }
                            {!user.isAuth &&
                                <Nav className={cl.logoButtons}>
                                    <NavLink className={cl.navbarItem} onClick={hideMobileMenu} to='/basket' alt="Корзина" title="Корзина">
                                        {isMobile ? "Корзина" :
                                            <div className="position-relative">
                                                <ShoppingCart />
                                                <span className={basket.basketItems?.length > 0 && 'navigationBasketCounter'}>
                                                {basket.basketItems?.length > 0 && basket.basketItems?.length}</span>
                                            </div>
                                        }
                                    </NavLink>
                                    <NavLink onClick={hideMobileMenu} className={cl.navbarItem} to='/login' alt="Войти" title="Войти">
                                        {isMobile ? "Войти" :
                                            <div>
                                                <Login style={{color: "#FFF"}} />
                                            </div>
                                        }
                                    </NavLink>

                                </Nav>
                            }

                    </Navbar.Collapse>

                </Container>
            </Navbar>

        </header>
    );
});

export default MyNavbar;