import React, {useEffect, useState} from 'react';
import {Form, Modal} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import {
    addCategoryImage,
    deleteCategory, deleteCategoryImage, fetchCurrentCategory,
    modifyCategory
} from "../../http/admin/categoryAdminAPI";
import {useIsMobile} from "../../hooks/useIsMobile";
import useDebounce from "../../hooks/useDebounce";
import Delete from "../../UI/svgs/delete";


const AdminCategoryItemModal = ({onHide, show, item, setUpdate, categories}) => {
    const [file, setFile] = useState('')
    const [category, setCategory] = useState({id: 0, name: '', description: '', categoryId: 0, ordering: 0, published: true, category_images: []})
    const isMobile = useIsMobile()
    const [refetch, setRefetch] = useState(0);

    useEffect(() => {
        setCategory(item)
        console.log(item)
    }, [item]);

    useDebounce(() => {
        fetchCurrentCategory(category.id).then(data => {
            console.log(data)
            setCategory(data)
        })
    }, 100, [refetch])

    const updateCategory = (e) => {
        e.preventDefault()
        modifyCategory({...category, id: item.id, newId: category.id}).then(() => {
            setUpdate(prev => prev+1)
            onHide()
        })
    }

    const deleteCurrent = (e) => {
        e.preventDefault()
        deleteCategory(category.id).then(() => {
            setUpdate(prev => prev+1)
            onHide()
        })

    }

    const delImg = () => {

        deleteCategoryImage({id: category.category_images[0].id}).then(() => {
            setRefetch(prev => prev+1)
        })
    }

    const addImg = async (e) => {
        const formData = new FormData()
        if (e.target.files.length>0){
        formData.append("categoryId", `${category.id}`)
            formData.append('file', e.target.files[0])

        await addCategoryImage(formData).then(() => {
            setRefetch(prev => prev+1)
            setFile('')
        })
        }
    }


    return (
        <Modal
            className='modal'
            show={show}
            onHide={onHide}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            fullscreen={isMobile}

        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter ">
                    <h3>Изменения категории: {item?.parent?.name && `${item.parent.name} > `}{item?.name}</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={isMobile && 'px-0 mx-0'}>
                <Form id="AdminCategoryItemForm" className="d-flex flex-column justify-content-center">
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
                    <Form.Control accept={"image/*"} value={file} title={category?.category_images?.length>0 ? "Только 1 изображение" : "Добавить изображение"} disabled={category?.category_images?.length>0} type="file" className="mb-2" multiple={false} onChange={(e) => addImg(e)} placeholder="Добавить изображение" />
                    {category?.category_images?.length > 0 &&
                        <div className="d-flex column">
                        <img className="adminCategoryImg" src={`${process.env.REACT_APP_API_URL}/images/categories/mini/${category.category_images[0].img}`} alt="Изображение категории" />
                            <div><span
                                title="Удалить"
                                onClick={() => delImg()}
                                className="pointer d-flex justify-content-end">
                                    <Delete />
                                </span></div>
                        </div>
                    }
                    <hr />
                    <div className="d-flex gap-2 justify-content-end">
                        <MyButton title={category?.children?.length>0 ? "Нельзя удалить, если есть дочерние категории" : "Удалить"} disabled={category?.children?.length>0 || category.id!==item.id} onClick={e => deleteCurrent(e)}>УДАЛИТЬ КАТЕГОРИЮ</MyButton>
                        <MyButton disabled={category?.name?.length<1 || category?.id?.length<1 || !category.id} onClick={e => updateCategory(e)}>СОХРАНИТЬ ИЗМЕНЕНИЯ</MyButton>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <MyButton onClick={onHide}>Закрыть</MyButton>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminCategoryItemModal;