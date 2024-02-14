import React, {useEffect, useState} from 'react';
import {Accordion, Form} from "react-bootstrap";
import MyButton from "../../../UI/MyButton/MyButton";
import {
    addProductAttribute,
    delProductAttribute,
    fetchAllAttributeCategories, fetchAllAttributes
} from "../../../http/admin/productAdminAPI";
import Delete from "../../../UI/svgs/delete";

const AdminProductAttributes = ({setUpdate, product, productId}) => {
    const [newAttributeCategoryId, setNewAttributeCategoryId] = useState(0);
    const [newAttributeId, setNewAttributeId] = useState(0);
    const [attributeCategories, setAttributeCategories] = useState([]);
    const [attributes, setAttributes] = useState([]);
    useEffect(() => {
        fetchAllAttributeCategories().then(data => setAttributeCategories(data))
        fetchAllAttributes().then(data => setAttributes(data))
    }, []);


    const delAttribute = async (attributeId) => {
        await delProductAttribute(attributeId, productId).then(() => setUpdate(prev => prev + 1))
    }

    const addAttribute = async (e, id) => {
        e.preventDefault()
        if(id!==0){
            await addProductAttribute(id, productId).then(() => setUpdate(prev => prev + 1))
        }
    }
    return (
        <Accordion className="productAdminAttributesAccordion mt-0">
            <Accordion.Item  eventKey="1">
                <Accordion.Header><div className="text-center w-100">Атрибуты</div></Accordion.Header>
                <Accordion.Body>
                    <div className='d-flex gap-2 mb-2'>
                        <div className="w-50">

                            <Form.Select onChange={(e) => {
                                setNewAttributeCategoryId(e.target.value)
                                setNewAttributeId(0)
                            }} value={newAttributeCategoryId}>
                                <option value={0}>Категория атрибутов</option>
                                {attributeCategories?.length> 0 &&
                                    attributeCategories.map(ac =>
                                        <option key={ac.id} value={ac.id}>{ac?.name}</option>
                                    )
                                }
                            </Form.Select>
                        </div>
                        <div className="d-flex flex-column attributeList">
                            {attributes?.length> 0 &&
                                attributes.filter(a => Number(a?.productAttributeCategoryId)===Number(newAttributeCategoryId)).map(a =>
                                    <button onClick={async (e) => await addAttribute(e, a.id)} key={a.id} value={a.id}>{a.value}</button>
                                )
                            }

                        </div>
                        {/*<Form.Select disabled={newAttributeCategoryId===0} onChange={(e) => setNewAttributeId(e.target.value)} value={newAttributeId}>*/}
                        {/*    <option value={0}>Атрибут</option>*/}
                        {/*    {attributes?.length> 0 &&*/}
                        {/*        attributes.filter(a => Number(a?.productAttributeCategoryId)===Number(newAttributeCategoryId)).map(a =>*/}
                        {/*            <option key={a.id} value={a.id}>{a.value}</option>*/}
                        {/*        )*/}
                        {/*    }*/}
                        {/*</Form.Select>*/}
                        {/*<MyButton disabled={newAttributeId===0} style={{fontSize: '0.7rem', width: "220px"}} classes="p-0" onClick={e => addAttribute(e)}>ДОБАВИТЬ АТРИБУТ</MyButton>*/}
                    </div>
                    <ul>
                        {product?.productAttribute?.length>0 &&
                            product.productAttribute.sort((a,b)=> a.id-b.id).map(pa =>
                                <li key={pa.id}>
                                    <div className="d-flex gap-3 align-items-center">
                                        {pa?.product_attribute_category?.name} - {pa?.value}
                                        <span
                                            title="Удалить"
                                            onClick={() => delAttribute(pa.id)}
                                            className="pointer">
                                                <Delete fill={"#777"} height={'24'} />

                                            </span>
                                    </div>
                                </li>
                            )
                        }
                    </ul>

                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default AdminProductAttributes;