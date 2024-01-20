import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import App from './App';
import UserStore from "./store/UserStore";
import ProductsStore from "./store/ProductsStore";
import CatalogueStore from "./store/CatalogueStore";
import FilterStore from "./store/FilterStore";
import BasketStore from "./store/BasketStore";
import LoadingStore from "./store/LoadingStore";

export const Context = createContext(null)


// ReactDOMClient.hydrateRoot(document.getElementById("root"),
//
//     <Context.Provider value={{
//         user: new UserStore(),
//         catalogue: new CatalogueStore(),
//         products: new ProductsStore(),
//         filters: new FilterStore(),
//         basket: new BasketStore(),
//         loading: new LoadingStore(),
//     }}
//     >
//
//         <div className='App'>
//             <App />
//
//         </div>
//
//
//     </Context.Provider>
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
      user: new UserStore(),
      catalogue: new CatalogueStore(),
      products: new ProductsStore(),
      filters: new FilterStore(),
      basket: new BasketStore(),
      loading: new LoadingStore(),
  }}
      >

          <div className='App'>
              <App />

          </div>


  </Context.Provider>
);
