import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._premium = 0
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setPremium(premium) {
        this._premium = premium
    }

    setUser(user) {
        this._user = user
    }
    get isAuth() {
        return this._isAuth
    }

    get premium() {
        return this._premium
    }

    get user() {
        return this._user
    }


}