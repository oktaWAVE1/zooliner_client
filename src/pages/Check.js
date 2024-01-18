import React, {useContext, useEffect} from 'react';
import Loader from "../UI/Loader/Loader";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Context} from "../index";
import jwtDecode from "jwt-decode";
import {observer} from "mobx-react-lite";

const Check = observer(() => {
    const {user} = useContext(Context)
    const [searchParams] = useSearchParams()
    const accessToken = JSON.parse(searchParams.get('accessToken'))
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.setItem('token', accessToken)
        const data = jwtDecode(accessToken)
        user.setUser(data)
        if(data.role){
            user.setIsAuth(true)
        }
        navigate('/')
    }, []);
    return (
        <div>
            <Loader />
        </div>
    );
});

export default Check;