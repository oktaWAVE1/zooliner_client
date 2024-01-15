import React, {useContext, useEffect} from 'react';
import {fetchCategoryItems} from "../../http/catalogueAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Accordion, Container, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const SideMenu = observer(() => {
    const {catalogue} = useContext(Context)

    useEffect(() => {
        fetchCategoryItems().then(data => catalogue.setCatalogue(data)
        )
    }, []);
    return (
        <Navbar className="sideBar">

            <Container>

                    {catalogue.catalogue.length>0 &&
                        catalogue.catalogue.filter(category => category.categoryId===0).map(category =>
                            <Accordion key={category.id}>
                                <Accordion.Item className="category" eventKey={category.id}>
                                    <Accordion.Header>
                                    <NavLink to={`/category/${category.id}`}>{category.name}</NavLink>
                                    </Accordion.Header><div className="sideMenuSubcategories">
                                 {category.children && category.children.map(subCategory =>
                                     <NavLink key={subCategory.id}  to={`/category/${subCategory.id}`}><Accordion.Body className="sideMenuSubcategory" key={subCategory.id}>
                                   {subCategory.name}
                                     </Accordion.Body></NavLink>


                                 )}
                                    </div>



                                    </Accordion.Item>
                            </Accordion>
                        )
                    }
                <Accordion>
                    <Accordion.Item className="category" eventKey={1000}>
                        <Accordion.Header className={'RoyalCategory'}>
                            <NavLink to={`/royal`}>Royal Canin</NavLink>
                        </Accordion.Header>
                    </Accordion.Item>
                </Accordion>

            </Container>

        </Navbar>

    );
});

export default SideMenu;