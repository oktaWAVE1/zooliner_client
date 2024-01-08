import {Accordion, Form, Modal} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import React, {useEffect, useState} from "react";
import {useIsMobile} from "../../hooks/useIsMobile";
import {
    addProductAttribute,
    addProductCategory,
    addProductImage, delProductAttribute, delProductCategory,
    delProductImage, fetchAllAttributeCategories, fetchAllAttributes,
    fetchCurrentProduct,
    setProductMasterImage, updateProduct
} from "../../http/admin/productAdminAPI";
import useDebounce from "../../hooks/useDebounce";
import ProductCard from "../features/ProductCard";
import {fetchAllCategories} from "../../http/admin/categoryAdminAPI";

const AdminProductModal = ({show, onHide, productId}) => {

    const [product, setProduct] = useState({});
    const [newCategoryId, setNewCategoryId] = useState(0);
    const [newAttributeCategoryId, setNewAttributeCategoryId] = useState(0);
    const [newAttributeId, setNewAttributeId] = useState(0);
    const [attributeCategories, setAttributeCategories] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [currentProduct, setCurrentProduct] = useState({});
    const [update, setUpdate] = useState(0);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchAllCategories().then(data => setCategories([...data].filter(c => !c.children.length>0)
            .sort((a,b) => a.categoryId-b.categoryId)))
        fetchAllAttributeCategories().then(data => setAttributeCategories(data))
        fetchAllAttributes().then(data => setAttributes(data))
    }, []);


    useDebounce(() => {
        fetchCurrentProduct(productId).then(data => {
            setCurrentProduct(data)
            setProduct(data)
        })

    }, 100, [productId, update])

    const delImg = async (id) => {
        await delProductImage(id).then(() => setUpdate(prev => prev + 1))
    }

    const delCategory = async (categoryId) => {
        await delProductCategory(categoryId, productId).then(() => setUpdate(prev => prev + 1))
    }

    const delAttribute = async (attributeId) => {
        await delProductAttribute(attributeId, productId).then(() => setUpdate(prev => prev + 1))
    }

    const addAttribute = async (e) => {
        e.preventDefault()
        if(newAttributeId!==0){
            await addProductAttribute(newAttributeId, productId).then(() => setUpdate(prev => prev + 1))
        }
    }

    const handleUpdateChanges = async (e) => {
        e.preventDefault()
        await updateProduct({
            title: currentProduct.title,
            shortDescription: currentProduct.shortDescription,
            description: currentProduct.description,
            weight: currentProduct.weight,
            price: currentProduct.price,
            indexNumber: currentProduct.indexNumber,
            discountedPrice: currentProduct.discountedPrice,
            metaTitle: currentProduct.metaTitle,
            metaDescription: currentProduct.metaDescription,
            special: currentProduct.special,
            hidden: currentProduct.hidden,
            published: currentProduct.published,
            id: productId
        }).then(() => setUpdate(prev => prev + 1))
    }

    const addCategory = async (e) => {
        e.preventDefault()
        if (newCategoryId!==0){
            await addProductCategory(newCategoryId, productId).then(() => setUpdate(prev => prev + 1))
        }
    }

    const setMasterImg = async (id) => {
        await setProductMasterImage(id).then(() => setUpdate(prev => prev + 1))
    }

    const addImg = async (e) => {
        console.log(e.target.files)
        if (e.target.files.length>0){
            for (let i =0; i< e.target.files.length; i++){
                let formData = new FormData()
                formData.append("productId", `${productId}`)
                formData.append('file', e.target.files[i])
                if (i===e.target.files.length-1){
                    await addProductImage(formData).then(() => {
                        setUpdate(prev => prev+1)
                    })
                } else {
                    await addProductImage(formData)
                }
            }
        }
    }


    const isMobile = useIsMobile()

    return (
        <Modal
            className='modal adminProductModal'
            show={show}
            onHide={onHide}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            fullscreen={isMobile}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                   <h4>{product?.id}. {product?.title} {product?.shortDescription}</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form style={{color: "#777"}}>
                    <div className="d-flex flex-wrap justify-content-between">
                        <div className='info'>
                            <div>{product?.title}</div>
                            <div>{product?.shortDescription}</div>
                            <div>Производитель: {product?.brand?.name}</div>

                            <Form.Label className="d-flex gap-2 align-items-center">
                                <Form.Control className="py-0 px-2" style={{width: "50px"}} step={'1'} type={'number'} value={currentProduct?.indexNumber || 0} onChange={e => setCurrentProduct({...currentProduct, indexNumber: e.target.value})} />
                                <div>Порядковый номер</div>
                            </Form.Label>
                            <Form.Label className="d-flex gap-2 align-items-center">
                                <Form.Control className="py-0 px-2" style={{width: "50px"}} min={'1'} step={'1'} type={'number'} value={currentProduct?.pack || 0} onChange={e => setCurrentProduct({...currentProduct, pack: e.target.value})} />
                                <div>Количество в упаковке</div>
                            </Form.Label>
                            {(product?.children && !product?.children?.length>0) &&
                             <div>
                                 <div className='d-flex gap-2'>
                                    <div><strong>Цена: {product.price} ₽</strong></div>
                                    <div><strong>Цена со скидкой: {product.discountedPrice} ₽</strong></div>
                                    <div>Вес: {product.weight}</div>
                                 </div>
                                 <Form.Label className="d-flex gap-2 align-items-center mb-0">
                                     <Form.Check checked={currentProduct?.inStock || false} disabled={true} />
                                     <div>В наличии</div>
                                 </Form.Label>
                             </div>
                            }
                            <Form.Label className="d-flex gap-2 align-items-center mb-0">
                                <Form.Check checked={currentProduct?.special || false} disabled={true} />
                                <div>Акционный товар</div>
                            </Form.Label>
                            <Form.Label className="d-flex gap-2 align-items-center mb-0">
                                <Form.Check checked={currentProduct?.published || false} disabled={true} />
                                <div>Опубликован</div>
                            </Form.Label>
                            <Form.Label className="d-flex gap-2 align-items-center">
                                <Form.Check type={"switch"} checked={currentProduct?.hidden || false} onChange={() => setCurrentProduct({...currentProduct, hidden: !currentProduct.hidden})} />
                                <div>Скрыть на сайте</div>
                            </Form.Label>
                            <div>
                                <p className="mx-0 px-0 mb-1"><strong>КАТЕГОРИИ:</strong></p>
                                <div className="d-flex gap-2 mb-2">
                                    <Form.Select onChange={(e) => setNewCategoryId(e.target.value)} value={newCategoryId}>
                                        <option value={0}>Выбрать категорию</option>
                                        {categories?.length> 0 &&
                                            categories.map(c =>
                                                <option key={c.id} value={c.id}>{c?.parent?.name && `${c.parent.name} > `}{c.name}</option>
                                            )
                                        }
                                    </Form.Select>
                                    <MyButton style={{fontSize: '0.7rem', width: "220px"}} classes="p-0" onClick={e => addCategory(e)}>ДОБАВИТЬ КАТЕГОРИЮ</MyButton>
                                </div>
                                <ul className="mb-2">
                                    {product?.category?.length>0 &&
                                        product.category.map(c =>
                                            <li key={c.id}><div className="d-flex gap-3 align-items-center">{c?.parent?.name ? `${c.parent.name} > ${c.name}` : c.name}
                                                <span
                                                title="Удалить"
                                                onClick={() => delCategory(c.id)}
                                                className="pointer material-symbols-outlined">
                                                delete
                                            </span>
                                            </div></li>
                                        )
                                    }
                                </ul>

                            </div>
                                <Accordion className="productAdminAttributesAccordion mt-0">
                                    <Accordion.Item  eventKey="1">
                                        <Accordion.Header><div className="text-center w-100">Аттрибуты</div></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='d-flex gap-2 mb-2'>
                                                <Form.Select onChange={(e) => {
                                                    setNewAttributeCategoryId(e.target.value)
                                                    setNewAttributeId(0)
                                                }} value={newAttributeCategoryId}>
                                                    <option value={0}>Категория аттрибутов</option>
                                                    {categories?.length> 0 &&
                                                        attributeCategories.map(ac =>
                                                            <option key={ac.id} value={ac.id}>{ac?.name}</option>
                                                        )
                                                    }
                                                </Form.Select>
                                                <Form.Select disabled={newAttributeCategoryId===0} onChange={(e) => setNewAttributeId(e.target.value)} value={newAttributeId}>
                                                    <option value={0}>Аттрибут</option>
                                                    {attributes?.length> 0 &&
                                                        attributes.filter(a => Number(a?.productAttributeCategoryId)===Number(newAttributeCategoryId)).map(a =>
                                                            <option key={a.id} value={a.id}>{a.value}</option>
                                                        )
                                                    }
                                                </Form.Select>
                                                <MyButton disabled={newAttributeId===0} style={{fontSize: '0.7rem', width: "220px"}} classes="p-0" onClick={e => addAttribute(e)}>ДОБАВИТЬ АТТРИБУТ</MyButton>
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
                                                                        className="pointer material-symbols-outlined">
                                                                        delete
                                                                    </span>
                                                            </div>
                                                            </li>
                                                    )
                                               }
                                           </ul>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                        </div>
                        {(product?.product_images) &&
                            <ProductCard addToCart={() => console.log()} product={product} preview={true} />
                        }
                    </div>
                    <Form.Label className="d-flex flex-wrap ">
                        <div className="px-2">Описание товара</div>
                        <textarea rows='4' placeholder={"Введите описание..."} type={'textarea'} className="px-2 py-1 w-100" value={currentProduct?.description || ''} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})} />
                    </Form.Label>
                    <Accordion className="productAdminMetaAccordion mt-0">
                        <Accordion.Item  eventKey="1">
                            <Accordion.Header><div className="text-center w-100">МЕТА</div></Accordion.Header>
                            <Accordion.Body>
                                <Form.Label className="d-flex flex-wrap ">
                                    <div className="px-2">Мета заголовок</div>
                                    <Form.Control type={"text"} placeholder={"Введите мета заголовок..."} className="px-2 py-1 w-100" value={currentProduct?.metaTitle || ''} onChange={e => setCurrentProduct({...currentProduct, metaTitle: e.target.value})} />
                                </Form.Label>
                                <Form.Label className="d-flex flex-wrap ">
                                    <div className="px-2">Мета описание</div>
                                    <Form.Control type={"text"} placeholder={"Введите мета описание..."} className="px-2 py-1 w-100" value={currentProduct?.metaDescription || ''} onChange={e => setCurrentProduct({...currentProduct, metaDescription: e.target.value})} />
                                </Form.Label>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Form>
                <div>
                    <MyButton classes="w-100 my-2" onClick={e => handleUpdateChanges(e)}>СОХРАНИТЬ ИЗМЕНЕНИЯ</MyButton>
                </div>
                <div>
                        <h4>Изображения:</h4>
                <Form>
                    <Form.Control title={"Добавить изображение"} accept={"image/*"} type="file" className="mb-2" multiple={true} onChange={(e) => addImg(e)} placeholder="Добавить изображение" />
                </Form>

                {product?.product_images?.length>0 &&
                    <div className='images d-flex gap-2 flex-wrap'>
                        {product.product_images.map(pi =>
                            <div key={pi.id}>
                                <img style={{boxShadow: "1px 1px 4px 4px rgba(0, 0, 0, 0.1)"}} className='item' loading="lazy"
                                    src={`${process.env.REACT_APP_API_URL}/images/products/${pi.img}`}/>
                                <span
                                    title="Сделать основной"
                                    onClick={() => setMasterImg(pi.id)}
                                    className="pointer master_btn material-symbols-outlined">
                                verified
                                </span>
                                <span
                                    title="Удалить"
                                    onClick={() => delImg(pi.id)}
                                    className="pointer del_btn material-symbols-outlined">
                                    delete
                                </span>

                            </div>
                        )
                        }
                    </div>

                }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <MyButton onClick={onHide}>Закрыть</MyButton>
            </Modal.Footer>
        </Modal>
    );

};

export default AdminProductModal;