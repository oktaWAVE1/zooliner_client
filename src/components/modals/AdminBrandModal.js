import React, {useEffect, useState} from 'react';
import {Accordion, Container, Form, Modal} from "react-bootstrap";
import useDebounce from "../../hooks/useDebounce";
import MyButton from "../../UI/MyButton/MyButton";
import {createBrand, deleteBrand, fetchAllBrands, modifyBrand} from "../../http/admin/brandAdminAPI";
import {useBrandsSortSearch} from "../../hooks/useBrandsSortSearch";
import ModalPagination from "../features/Admin/ModalPagination";
import {useIsMobile} from "../../hooks/useIsMobile";

const AdminBrandModal = ({onHide, show}) => {
    const limit = 10
    const [brand, setBrand] = useState({id: '', name: '', img: '', published: true})
    const [brands, setBrands] = useState([{id:'', name: '', img: '', published: false}])
    const [currentBrands, setCurrentBrands] = useState([]);
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('');
    const searchedBrands = useBrandsSortSearch(brands, query)
    const addBrand = (e) => {
        e.preventDefault()
        createBrand(brand).then(() => {
            setBrand({name: '', img: '', id: '', published: true});
            fetchAllBrands().then(data => setBrands(data));
        })
    }
    useEffect(() => {
        setCurrentBrands([...searchedBrands].slice(limit*(page-1), limit*page))
    }, [page]);

    useDebounce(() => {
        setCurrentBrands([...searchedBrands].slice(limit*(page-1), limit*page))
        setPage(1)
    }, 200, [searchedBrands])
    useEffect(() => {
        fetchAllBrands().then(data => setBrands(data))
    },[show])

    const switchPublish = (id, published) => {
        modifyBrand(id, !published).then(() => fetchAllBrands().then(data => setBrands(data)))
    }

    const deleteCurrent = (id) => {
        deleteBrand(id).then(() => fetchAllBrands().then(data => setBrands(data)))
    }
    const isMobile = useIsMobile()

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
                    <h1>Список производителей: </h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Accordion className="addBrandAccordion">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><div style={{color: "white", textAlign: "center", width: "100%"}}>Добавить производителя</div></Accordion.Header>
                            <Accordion.Body>
                                <Form id='AdminBrandForm' className="d-flex flex-column justify-content-center">
                                    <Form.Control placeholder="Название производителя" className="mb-2" type='text' value={brand.name} onChange={e => setBrand({...brand, name: e.target.value})} />
                                    <Form.Control placeholder="Id производителя" className="mb-2" type='text' value={brand.id} onChange={e => setBrand({...brand, id: e.target.value})} />
                                    <Form.Check type="switch" className="mb-2" isValid={true} label="Опубликовать" checked={brand.published}  onChange={() => setBrand({...brand, published: !brand.published})} />
                                    <MyButton disabled={brand.name.length<1 || brand.id.length<1} onClick={e => addBrand(e)}>ДОБАВИТЬ</MyButton>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>
                <Container>
               <Form id="AdminBrandSearchForm">
                   <div className='mt-3 mb-3'>
                       <Form.Control type='text' placeholder='Поиск производителя'
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                       />
                   </div>

               </Form>
                </Container>
            <Container>


                    {currentBrands.map(b =>
                        <div key={b.id}>
                            <div className="adminBrandList">
                                <div>{b.id} {b.name}</div>
                                <div className="pointer d-flex justify-content-end" title="published">
                                    <Form id="AdminBrandPublishForm">
                                        <Form.Check type="switch" isValid={true}  checked={b.published}  onChange={() => switchPublish(b.id, b.published)} />
                                    </Form>
                                </div>
                                <div><span
                                    title="Удалить"
                                    onClick={() => deleteCurrent(b.id)}
                                    className="pointer d-flex justify-content-end material-symbols-outlined">
                                    delete
                                </span></div>

                            </div>
                            <hr style={{height: "4px", margin: "0"}} />
                        </div>
                    )}


            </Container>
            <ModalPagination limit={limit} total={searchedBrands.length} setPage={setPage} page={page} />
            </Modal.Body>
            <Modal.Footer>
                <MyButton onClick={onHide}>Закрыть</MyButton>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminBrandModal;