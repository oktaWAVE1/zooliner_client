import React, {useEffect, useState} from 'react';
import {Accordion, Container, Form, Modal} from "react-bootstrap";
import useDebounce from "../../hooks/useDebounce";
import MyButton from "../../UI/MyButton/MyButton";
import {
    createCategory,
    fetchAllCategories,
} from "../../http/admin/categoryAdminAPI";
import ModalPagination from "../features/Admin/ModalPagination";
import {useIsMobile} from "../../hooks/useIsMobile";
import {useCategorySortSearch} from "../../hooks/useCategorySortSearch";
import AdminCategoryItemModal from "./AdminCategoryItemModal";

const AdminCategoryModal = ({onHide, show}) => {
    const limit = 10
    const [showAccordion, setShowAccordion] = useState('-1');
    const [category, setCategory] = useState({id: 0, name: '', description: '', categoryId: 0, ordering: 0, published: true})
    const [file, setFile] = useState(null)
    const [update, setUpdate] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([{id: '', name: '', description: '', categoryId: 0, ordering: 0, published: true}])
    const [currentCategories, setCurrentCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState({id: 0, name: '', description: '', categoryId: 0, ordering: 0, published: true});
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('');
    const searchedCategories = useCategorySortSearch(categories, query)
    const isMobile = useIsMobile()

    const addCategory = (e) => {
        e.preventDefault()
        const formData = new FormData()
        for (const [key, value] of Object.entries(category)) {
            formData.append(`${key}`, `${value}`)
        }
        if (file){
            formData.append('file', file[0])
        }
        createCategory(formData).then(() => {
            setCategory({id: '', name: '', description: '', categoryId: 0, ordering: 0, published: true});
            setFile(null)
            setShowAccordion('-1')
            fetchAllCategories().then(data => setCategories(data));
        })
    }
    useEffect(() => {
        setCurrentCategories([...searchedCategories].slice(limit*(page-1), limit*page))
    }, [page]);

    useDebounce(() => {
        setCurrentCategories([...searchedCategories].slice(limit*(page-1), limit*page))
        setPage(1)
    }, 200, [searchedCategories])

    useDebounce(() => {
        fetchAllCategories().then(data => setCategories(data))
    }, 50, [show, update])


    const selectFile = e => {
        setFile(e.target.files)
    }
    const selectItem = (item) => {
        setCurrentCategory(item)
        setShowModal(true)
    }
    return (
        <Modal
            className='modal'
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            fullscreen={isMobile}

        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter ">
                    <h3>Список категорий: </h3>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={isMobile && 'px-0 mx-0'}>
                <Container>
                    <Accordion activeKey={showAccordion} className="addCategoryAccordion">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header onClick={() => setShowAccordion(showAccordion==="0" ? "-1" : "0")}><div style={{color: "white", textAlign: "center", width: "100%"}}>Добавить категорию</div></Accordion.Header>
                            <Accordion.Body>
                                <Form id='AddCategoryForm'  className="d-flex flex-column justify-content-center">
                                    <Form.Control placeholder="Название категории" className="mb-2" type='text' value={category.name} onChange={e => setCategory({...category, name: e.target.value})} />
                                    <Form.Label className="d-flex gap-3 align-items-center">
                                        <Form.Control placeholder="Id категории" className="w-50" type='text' value={category.id} onChange={e => setCategory({...category, id: e.target.value})} />
                                        <span className="w-50 justify-self-end">ID категории</span>
                                    </Form.Label>
                                    <Form.Control placeholder="Описание" className="mb-2" type='text' value={category.description} onChange={e => setCategory({...category, description: e.target.value})} />
                                    <Form.Label className="d-flex gap-3 align-items-center">
                                        <Form.Control title="Порядок" placeholder="Порядок" className="w-50" type='number' value={category.ordering} onChange={e => setCategory({...category, ordering: e.target.value})} />
                                        <span className="w-50 justify-self-end">Порядок</span>
                                    </Form.Label>
                                    <Form.Label className="d-flex gap-3 align-items-center">
                                        <Form.Select className="w-50" onChange={(e) => setCategory({...category, categoryId: e.target.value})} value={category.categoryId} aria-label="Верхняя">
                                            <option value={0}>Верхняя категория</option>
                                            {categories.map((c) =>
                                                <option className="categoryOption" key={c.id} value={c.id}>{c?.parent?.name && `${c.parent.name} > `}{c.name}</option>
                                            )}
                                        </Form.Select>
                                        <span className="w-50 justify-self-end">Родительская категория</span>
                                    </Form.Label>
                                    <Form.Check className="my-2" type="switch" isValid={true} label="Опубликовать" checked={category.published}  onChange={() => setCategory({...category, published: !category.published})} />
                                    <Form.Control accept={"image/*"} type="file" className="mb-2" multiple={false} onChange={selectFile} placeholder="Выберите изображение" />
                                    <MyButton disabled={category.name.length<1 || category.id.length<1 || !category.id} onClick={e => addCategory(e)}>ДОБАВИТЬ</MyButton>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>
                <Container>
                    <Form id="SearchCategoryForm">
                        <div className='mt-3 mb-3'>
                            <Form.Control type='text' placeholder='Поиск категории'
                                          value={query}
                                          onChange={e => setQuery(e.target.value)}
                            />
                        </div>

                    </Form>
                </Container>
                <Container>


                    {currentCategories.map(c =>
                        <div key={c.id}>
                            <div className="adminCategoriesList pointer" onClick={() => selectItem(c)}>
                                <div className="pointer d-flex justify-content-between" >
                                    <div><strong>{c.parent && `${c.parent.name} > `}{c.name} ({c.id})</strong></div>
                                    <Form id='AdminCategoryPublishedForm' title="published">
                                        <Form.Check type="switch" disabled isValid={true}  checked={c.published} label="Опубликовано"/>
                                    </Form>
                                </div>
                                <div>{c.description}</div>
                                <div>Порядок: {c.ordering}</div>

                            </div>
                            <hr style={{height: "4px", margin: "0"}} />
                        </div>
                    )}


                </Container>
                <ModalPagination limit={limit} total={searchedCategories.length} setPage={setPage} page={page} />
                <AdminCategoryItemModal show={showModal} onHide={() => setShowModal(false)} setUpdate={setUpdate} item={currentCategory} categories={categories} />
            </Modal.Body>
            <Modal.Footer>
                <MyButton onClick={onHide}>Закрыть</MyButton>
            </Modal.Footer>

        </Modal>
    );
};

export default AdminCategoryModal;