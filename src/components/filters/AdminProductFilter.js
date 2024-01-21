import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import MyButton from "../../UI/MyButton/MyButton";
import {fetchAllBrands} from "../../http/admin/brandAdminAPI";
import {fetchAllCategories} from "../../http/admin/categoryAdminAPI";

const AdminProductFilter = ({setFilters, filters, sort, setSort, setUpdate}) => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetchAllCategories().then(data => setCategories([...data].filter(c => !c.children.length>0)
            .sort((a,b) => a.categoryId-b.categoryId)))
        fetchAllBrands().then(data => {
            setBrands(data)
        })
    }, []);

    const clearFilters = (e) => {
        e.preventDefault()
        setFilters({published: '', inStock: '', hasImages: '', special: '', brandId: 0, categoryId: 0})
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        setUpdate(prev => prev+1)
    }

    return (
        <Form id="ProductFilterForm" className="d-flex justify-content-start align-items-end flex-wrap gx-1" style={{columnGap: "6px"}}>
            <Form.Label className="mb-0">
                <span className="px-2">Опубликованы</span>
                <Form.Select onChange={(e) => setFilters({...filters, published: e.target.value})} value={filters.published}>
                    <option value={''}>Все</option>
                    <option value={'false'}>Нет</option>
                    <option value={'true'}>Да</option>
                </Form.Select>
            </Form.Label>
            <Form.Label className="mb-0">
                <span className="px-2">Скрыты на сайте</span>
                <Form.Select onChange={(e) => setFilters({...filters, hidden: e.target.value})} value={filters.hidden}>
                    <option value={''}>Все</option>
                    <option value={'false'}>Нет</option>
                    <option value={'true'}>Да</option>
                </Form.Select>
            </Form.Label>
            <Form.Label className="mb-0">
                <span className="px-2">Изображения</span>
                <Form.Select onChange={(e) => setFilters({...filters, hasImages: e.target.value})} value={filters.hasImages}>
                    <option value={''}>Все</option>
                    <option value={'false'}>Нет</option>
                    <option value={'true'}>Есть</option>
                </Form.Select>
            </Form.Label>
            <Form.Label className="mb-0">
                <span className="px-2">Акционный</span>
                <Form.Select onChange={(e) => setFilters({...filters, special: e.target.value})} value={filters.special}>
                    <option value={''}>Все</option>
                    <option value={'false'}>Нет</option>
                    <option value={'true'}>Да</option>
                </Form.Select>
            </Form.Label>

            <Form.Label className="mb-0">
                <span className="px-2">Категория</span>
                <Form.Select onChange={(e) => setFilters({...filters, categoryId: Number(e.target.value)})} value={filters.categoryId}>
                    <option value={0}>Все</option>
                    <option value={-1000}>Нет категорий</option>
                    {categories?.length> 0 &&
                        categories.map(c =>
                            <option key={c.id} value={c.id}>{c?.parent?.name && `${c.parent.name} > `}{c.name}</option>
                        )
                    }
                </Form.Select>
            </Form.Label>
            <Form.Label className="mb-0">
                <span className="px-2">Производитель</span>
                <Form.Select onChange={(e) => setFilters({...filters, brandId: Number(e.target.value)})} value={filters.brandId}>
                    <option value={0}>Все</option>
                    {brands?.length> 0 &&
                        brands.map(b =>
                            <option key={b.id} value={b.id}>{b?.name?.toUpperCase()}</option>
                        )
                    }
                </Form.Select>
            </Form.Label>
            <MyButton classes={"px-2"} onClick={clearFilters}>Сбросить все</MyButton>
            <Form.Label className="mb-0">
                <span className="px-2">Сортировка</span>
                <Form.Select onChange={(e) => setSort(e.target.value)} value={sort}>
                    <option value={'name'}>Название</option>
                    <option value={'id'}>id</option>
                    <option value={'index'}>Порядок</option>
                </Form.Select>
            </Form.Label>
            <MyButton classes={"px-2"} onClick={handleUpdate}>Обновить</MyButton>
        </Form>
    );
};

export default AdminProductFilter;