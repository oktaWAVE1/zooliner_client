import {makeAutoObservable} from "mobx";

export default class BasketStore {
    constructor() {
        this._basketItems = []
        this._total = 0
        this._discount = 0
        makeAutoObservable(this)
    }

    setTotal(total) {
        this._total = total
    }

    setDiscount(discount) {
        this._discount = discount
    }

    setBasketItems(basketItems) {
        this._basketItems = basketItems
    }

    get basketItems() {
        return this._basketItems
    }

    get total() {
        return this._total
    }

    get discount() {
        return this._discount
    }

}