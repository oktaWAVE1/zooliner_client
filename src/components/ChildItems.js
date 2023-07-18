import React from 'react';
import MyButton from "../UI/MyButton/MyButton";

const ChildItems = ({chooseChild, chosenProduct, parentProduct, ...props}) => {
    return (
        <div className="desc">

            <div className="children">
                {parentProduct?.children?.length>0 &&

                    parentProduct?.children.filter(c => c.published===true).sort((a, b) => b.price-a.price).map(child =>
                        <MyButton key={child.id} onClick={() => chooseChild(child.id)} classes={child.id === chosenProduct.id ? "active" : ""}>{child.title}</MyButton>
                    )
                }
            </div>
            {chosenProduct?.discountedPrice>0 ? <h4 className="price"><span className="oldPrice">{chosenProduct?.price}</span><span className="newPrice">{chosenProduct?.discountedPrice} ₽</span></h4> : <h4 className="price">{chosenProduct?.price} ₽</h4>}

        </div>
    );
};

export default ChildItems;