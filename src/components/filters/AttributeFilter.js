import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {atrributeFilterUpdate} from "../../utils/atrributeFilterUpdate";

const AttributeFilter = observer(() => {
    const {products, filters} = useContext(Context)

    function checkAttribute(attributeId, attributeCategory, lastChangedCategory) {

        if (!filters.attributeFilters[attributeCategory]) {
            filters.setAttributeFilters({...filters.attributeFilters, [attributeCategory]: [attributeId]})
        }
        else if (filters.attributeFilters[attributeCategory] && !filters.attributeFilters[attributeCategory].includes(attributeId)){
            filters.setAttributeFilters({...filters.attributeFilters, [attributeCategory]: [...filters.attributeFilters[attributeCategory], attributeId]})
        }
        else if (filters.attributeFilters[attributeCategory].includes(attributeId)){
            let tempAttributes = {}
            Object.entries(filters.attributeFilters).forEach(entry => {
                const [key, value] = entry
                if (key!=attributeCategory){
                    tempAttributes[key] = value
                } else if (value.length>1){
                    tempAttributes[key] = value.filter(brand => brand!==attributeId)
                }
            })
            filters.setAttributeFilters(tempAttributes)
        }
        // products.setCurrentAttributes(atrributeFilterUpdate(products.currentProducts, products.currentAttributes, lastChangedCategory))
        filters.setAttributeCheckedFilters([])
        for (const category in filters.attributeFilters) {
            for (let i = 0; i<filters.attributeFilters[category].length; i++) {
                filters.setAttributeCheckedFilters([...filters.attributeCheckedFilters, filters.attributeFilters[category][i]])
            }
        }
        if(filters.attributeCheckedFilters.length===0){
            filters.setAttributeFilters({})
        }
    }

    return (
        <div className="attributeFilter">
            {products.currentAttributes &&
                Object.keys(products.currentAttributes).map((item, i) => (

                    <div key={i}>{item}
                        {products.currentAttributes[item] &&
                        products.currentAttributes[item].map(a =>
                            <div key={a.id}>
                                <input type="checkbox" key={a.id} checked={filters.attributeCheckedFilters.includes(a.id)} onChange={() => checkAttribute(a.id, a.categoryId, item)} />
                                <label>{a.name}</label>
                            </div>
                        )
                    }</div>
                    )
                )
            }
        </div>
    );
});

export default AttributeFilter;