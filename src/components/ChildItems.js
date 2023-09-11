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
            {(chosenProduct?.price * process.env.REACT_APP_BONUS_RATE) > 1 &&
                <div title='бонусных баллов за покупку'
                    className='bonusPoints'>{chosenProduct?.discountedPrice > 0 ? `${Math.floor(chosenProduct?.discountedPrice*parseFloat(process.env.REACT_APP_BONUS_RATE))}` : `${Math.floor(chosenProduct?.price*parseFloat(process.env.REACT_APP_BONUS_RATE))}`}
                    <span className="material-symbols-outlined">
pet_supplies
</span></div>
            }
        </div>
    );
};

export default ChildItems;