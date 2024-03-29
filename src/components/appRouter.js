import React, {useContext, useEffect, useState} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Loader from "../UI/Loader/Loader";


const AppRouter = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false),180)
    }, []);

    if(loading) return <Loader />

    return (
            <Routes>
                {user.isAuth ?
                    authRoutes.map(r =>
                        <Route key={r.path} path={r.path} element={r.element}/>
                    ) :
                    publicRoutes.map(r =>
                        <Route key={r.path} path={r.path} element={r.element}/>
                    )
                }
                {user.user.role==='ADMIN' &&
                    adminRoutes.map(r =>
                        <Route key={r.path} path={r.path} element={r.element}/>
                    )
                }
                <Route path="/*" status={404} element=<Navigate to='/page404' /> />

            </Routes>

    );
});

export default AppRouter;