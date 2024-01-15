import React from 'react';
import {Form} from "react-bootstrap";

const AdminProductModalChildren = ({product}) => {
    console.log(product)
    return (

        <div>
            <h4>Дочерние товары:</h4>
            <Form id="ProductChildren">
                <table className='w-100'>
                    <thead>
                    <tr>
                        <td>id/Наименование</td>
                        <td className="text-center">Цена</td>
                        <td className="text-center">Со скидкой</td>
                        <td className="text-center">Наличие</td>
                        <td className="text-center">Опубликован</td>
                        <td className="text-center">Акционный</td>
                    </tr>
                    </thead>
                    <tbody>
                        {product.children.map(child =>
                        <tr key={child.id}>
                            <td>{child.id}. <strong>{child.title}</strong></td>
                            <td className="text-center">{child.price}</td>
                            <td className="text-center">{child.discountedPrice}</td>
                            <td className="text-center"><Form.Check checked={child.inStock} disabled={true} /></td>
                            <td className="text-center"><Form.Check checked={child.published} disabled={true} /></td>
                            <td className="text-center"><Form.Check checked={child.special} disabled={true} /></td>

                        </tr>
                        )}

                    </tbody>
                </table>

            </Form>
        </div>
    );
};

export default AdminProductModalChildren;