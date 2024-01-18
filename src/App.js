import './App.css';

import AppRouter from "./components/appRouter";
import React, {useContext, useEffect, useState, Suspense} from "react";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import Loader from "./UI/Loader/Loader";
import {check} from "./http/userAPI";
import Footer from "./components/footer/Footer";
import SideMenu from "./components/sidemenu/SideMenu";
import BasketBlock from "./components/features/BasketBlock";

const MyNavbar = React.lazy(() => import('./components/navbar/MyNavbar'));


const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        check().then(data => {
            if(typeof data === 'object') {
                user.setUser(data);
                user.setIsAuth(true);
            }

        }).finally(() => {
            setLoading(false)
        })
        // eslint-disable-next-line
    },[])
    if(loading) {
        return <Loader />
    }
  return (
    <>
      <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <MyNavbar/>
          </Suspense>

          <div className="mainContainer">
              <SideMenu/>
              <AppRouter/>
              <BasketBlock />
          </div>

          <Footer/>
      </BrowserRouter>
    </>

  );
});

export default App;
