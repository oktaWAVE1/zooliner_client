import React from 'react';
import {Link} from "react-router-dom";

const SearchItem = ({item}) => {
    return (
        <div className={"searchBarItem"}>
            <div className='img'>{item.product_images.length>0 &&
                <img loading="lazy" src={`${process.env.REACT_APP_API_URL}/images/products/mini/${item.product_images[0]?.img}`}/>}</div>
            <div><Link className="searchLink" to={`/product/${item.id}`}>{item.title.toUpperCase()} {item.shortDescription}</Link></div>

        </div>
    );
};

export default SearchItem;