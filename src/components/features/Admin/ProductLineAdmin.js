import React from 'react';
import {Form} from "react-bootstrap";
import {updateCurrentProductIndex} from "../../../http/admin/productAdminAPI";

const ProductLineAdmin = ({product, showProduct}) => {
    const handleUpdateIndex = (e) => {
        e.preventDefault()
        updateCurrentProductIndex(product.id, e.target.value)
    }



    return (
        <div>
            <div className="line d-flex justify-content-between w-100 align-items-center">
                <div style={{fontSize:"10px"}}>{product?.brand?.name}</div>
                <div className="px-2 text-center pointer" onClick={() => showProduct(product.id)}>{product.id}. {product.title} {product.shortDescription}</div>
                <Form id="ProductLineAdminForm" className='d-flex'>
                    {product?.special &&
                    <div className="px-1" style={{color: "#d53e07", cursor: "default"}} title='Акционный'>
                        A
                    </div>
                    }
                    <div title="порядок">
                        <Form.Control className="adminProductIndex" type="number" defaultValue={product.indexNumber} onBlur={e => handleUpdateIndex(e)} />
                    </div>
                    <div title="опубликовано" className="mt-1">
                        <Form.Check disabled={true} checked={product.published} />
                    </div>

                </Form>

            </div>
            <hr className="my-1" />
        </div>


    );
};

export default ProductLineAdmin;