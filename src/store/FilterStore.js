import {makeAutoObservable} from "mobx";

export default class FilterStore {
    constructor() {
        this._brandFilters = []
        this._attributeFilters = {}
        this._attributeCheckedFilters = []
        makeAutoObservable(this)
    }

    setBrandFilters(brandFilters) {
        this._brandFilters = brandFilters
    }

    get brandFilters() {
        return this._brandFilters
    }

    setAttributeFilters(attributeFilters) {
        this._attributeFilters = attributeFilters
    }

    get attributeFilters() {
        return this._attributeFilters
    }

    setAttributeCheckedFilters(attributeCheckedFilters) {
        this._attributeCheckedFilters = attributeCheckedFilters
    }

    get attributeCheckedFilters() {
        return this._attributeCheckedFilters
    }


}