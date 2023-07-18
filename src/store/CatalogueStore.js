import {makeAutoObservable} from "mobx";

export default class CatalogueStore {
    constructor() {
        this._catalogue = [
        ]
        makeAutoObservable(this)
    }

    setCatalogue(catalogue) {
        this._catalogue = catalogue
    }

    get catalogue() {
        return this._catalogue
    }


}