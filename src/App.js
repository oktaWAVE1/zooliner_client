import './App.css';

import AppRouter from "./components/appRouter";
import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import Loader from "./UI/Loader/Loader";
import MyNavbar from "./components/navbar/MyNavbar";
import {check} from "./http/userAPI";
import Footer from "./components/footer/Footer";
import SideMenu from "./components/sidemenu/SideMenu";
import BasketBlock from "./components/BasketBlock";


const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        check().then(data => {

            user.setUser(data);
            user.setIsAuth(true);

        }).finally(() => {
            setLoading(false)
        })
    },[])
    if(loading) {
        return <Loader />
    }
  return (
          <BrowserRouter>

              <MyNavbar/>
              <div className="mainContainer">
                  <SideMenu/>
                  <AppRouter/>
                  <BasketBlock />
              </div>

              <Footer/>
          </BrowserRouter>


  );
});

export default App;
