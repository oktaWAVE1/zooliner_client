import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import ProductsStore from "./store/ProductsStore";
import CatalogueStore from "./store/CatalogueStore";
import FilterStore from "./store/FilterStore";


export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
      user: new UserStore(),
      catalogue: new CatalogueStore(),
      products: new ProductsStore(),
      filters: new FilterStore(),
  }}
      >

          <div className='App'>
              <App />

          </div>


  </Context.Provider>
);
