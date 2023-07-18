import {makeAutoObservable} from "mobx";

export default class ProductsStore {
    constructor() {
        this._products = []
        this._currentProducts = []
        this._filteredProducts = []
        this._brands = []
        this._currentBrands = []
        this._attributes = {}
        this._currentAttributes = {}
        this._page = 1
        this._limit = 24
        this._totalCount = 0
        makeAutoObservable(this)
    }

    setProducts(products) {
        this._products = products
    }
    setCurrentProducts(currentProducts) {
        this._currentProducts = currentProducts
    }

    setFilteredProducts(filteredProducts) {
        this._filteredProducts = filteredProducts
    }

    setBrands(brands) {

        this._brands = brands
    }

    setCurrentBrands(currentBrands) {

        this._currentBrands = currentBrands
    }

    setAttributes(attributes) {

        this._attributes = attributes
    }

    setCurrentAttributes(currentAttributes) {

        this._currentAttributes = currentAttributes
    }

    setPage(page) {
        this._page = page
    }

    setLimit(limit) {
        this._limit = limit
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }

    get products() {
        return this._products
    }

    get currentProducts() {
        return this._currentProducts
    }

    get filteredProducts() {
        return this._filteredProducts
    }

    get brands() {
        return this._brands
    }

    get currentBrands() {
        return this._currentBrands
    }

    get attributes() {
        return this._attributes
    }

    get currentAttributes() {
        return this._currentAttributes
    }

    get page() {
        return this._page
    }

    get limit() {
        return this._limit
    }

    get totalCount() {
        return this._totalCount
    }

}