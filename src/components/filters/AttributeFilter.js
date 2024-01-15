import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Form} from "react-bootstrap";

const AttributeFilter = observer(() => {
    const {products, filters} = useContext(Context)
    const clearAttributes = (e) => {
        e.preventDefault()
        filters.setAttributeFilters({})
        filters.setAttributeCheckedFilters([])
    }
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
            <Form id="AttributeFilterForm">
            {products.currentAttributes &&
                Object.keys(products.currentAttributes).map((item, i) => (

                    <div key={i} className='attributeFilterGroup'>

                            <div><h5>{item}: </h5></div>

                            {products.currentAttributes[item] &&
                            products.currentAttributes[item].map(a =>

                                <Form.Check type="switch" id={a.id} label={a.name} key={`${a.id} | ${filters.attributeFilters?.item?.a?.id}`} checked={filters.attributeCheckedFilters.includes(a.id)} isValid={filters.attributeCheckedFilters.includes(a.id)} onChange={() => checkAttribute(a.id, a.categoryId, item)} />

                            )
                            }
                        </div>
                    )
                )
            }
            <span className='clearFilter pointer' href='#' onClick={(e) => clearAttributes(e)}>Сбросить все</span>
            </Form>
        </div>
    );
});

export default AttributeFilter;