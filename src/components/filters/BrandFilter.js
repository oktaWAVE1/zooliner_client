import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import MyButton from "../../UI/MyButton/MyButton";

const BrandFilter = observer(() => {
    const {products, filters} = useContext(Context)
    const clearBrands = (e) => {
        e.preventDefault()
        filters.setBrandFilters([])
    }

    const check = (b) => {
        if (filters.brandFilters.includes(b.id)){
            filters.setBrandFilters([...filters.brandFilters].filter(brand => brand!==(b.id)) )
        } else {
            filters.setBrandFilters([...filters.brandFilters, (b.id)])
        }

    }
    return (
        <div className="brandFilter">
            {products.currentBrands &&
                products.currentBrands.map(b =>
                    <MyButton classes={filters.brandFilters.includes((b.id)) ? `active item-${b.id}` : `item-${b.id}`}  onClick={() => check(b)} key={b.id}>{b.name}</MyButton>
                )
            }
            <a className='clearFilter' href='#' onClick={(e) => clearBrands(e)}>Сбросить все</a>
        </div>
    );
});

export default BrandFilter;