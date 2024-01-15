import React, {useContext, useRef, useState} from 'react';
import {Accordion, Container, Nav, Navbar} from "react-bootstrap";
import cl from './MyNavbar.module.css'
import {Link, NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {userLogout} from "../../http/userAPI";
import SearchBar from "../search/SearchBar";
import {useIsMobile} from "../../hooks/useIsMobile";



const MyNavbar = observer(() => {
    const {user, catalogue} = useContext(Context)
    const [expanded, setExpanded] = useState(false);
    const logout = () => {
        userLogout().then(() => {
            user.setUser({})
            user.setIsAuth(false)
            localStorage.removeItem('token')
            hideMobileMenu()
        })
    }
    const isMobile = useIsMobile()
    const menuRef = useRef(null)
    const togglerRef = useRef(null)
    const hideMobileMenu = () => {
        const mobileMenu = menuRef.current
        mobileMenu.className = 'navbar-collapse collapse'
        const toggler = togglerRef.current
        toggler.className = "navbar-toggler collapsed"
        setExpanded(prev => !prev)
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

                            {user.isAuth && <Nav className="d-flex justify-content-center align-items-start">

                                {user.user.role === 'ADMIN' &&
                                            <NavLink onClick={hideMobileMenu} className={cl.navbarItem}
                                                     to='/admin'>
                                                {isMobile ? "Админка" :
                                                    <span className="material-symbols-outlined" title="Админка">
                                                        shield_person
                                                    </span>
                                                }
                                            </NavLink>

                                }
                                <NavLink className={cl.navbarItem} onClick={hideMobileMenu} to='/basket' alt="Корзина" title="Корзина">
                                    {isMobile ? "Корзина" :
                                        <span className="material-symbols-outlined" title="Корзина">
                                            shopping_cart
                                        </span>
                                    }
                                </NavLink>
                                <NavLink onClick={hideMobileMenu} className={cl.navbarItem} to='/user'>
                                    {isMobile ? "Личный кабинет" :
                                        <span className="material-symbols-outlined" title='Личный кабинет'>
                                            person
                                        </span>
                                    }
                                </NavLink>
                                <div onClick={() => logout()} className={[cl.logout_btn, cl.navbarItem].join(" ")}>
                                    {isMobile ? "Выход":

                                    <span className="material-symbols-outlined" title="Выход">
                                        logout
                                    </span>
                                }
                                </div>

                            </Nav>
                            }
                            {!user.isAuth &&
                                <Nav>
                                    <NavLink className={cl.navbarItem} onClick={hideMobileMenu} to='/basket' alt="Корзина" title="Корзина">
                                        {isMobile ? "Корзина" :
                                        <span className="material-symbols-outlined" title="Корзина">
                                        shopping_cart
                                    </span>
                                        }
                                    </NavLink>
                                    <NavLink onClick={hideMobileMenu} className={cl.navbarItem} to='/login'>
                                        {isMobile ? "Войти" :
                                            <span className="material-symbols-outlined" title="Войти">
                                        login
                                        </span>
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