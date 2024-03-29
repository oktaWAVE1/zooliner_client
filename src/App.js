import './App.css';

import React, {useContext, useEffect, useState, Suspense} from "react";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import Loader from "./UI/Loader/Loader";
import {check} from "./http/userAPI";
import SideMenu from "./components/sidemenu/SideMenu";

const BasketBlock = React.lazy(() => import('./components/features/BasketBlock'));
const Footer = React.lazy(() => import('./components/footer/Footer'));
const AppRouter = React.lazy(() => import('./components/appRouter'));
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
          <Suspense>
            <MyNavbar/>
          </Suspense>

          <div className="mainContainer">
              <SideMenu/>
              <Suspense fallback={<Loader />}>
                <AppRouter/>
              </Suspense>
              <Suspense>
                <BasketBlock />
              </Suspense>
          </div>
          <Suspense>
            <Footer/>
          </Suspense>
      </BrowserRouter>
    </>

  );
});

export default App;
