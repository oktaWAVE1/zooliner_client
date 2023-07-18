import IndexPage from "./pages/IndexPage";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import UserPage from "./pages/UserPage";
import ResetPass from "./pages/ResetPass";
import PaymentAndDelivery from "./pages/PaymentAndDelivery";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import BonusPage from "./pages/BonusPage";
import Royal from "./pages/Royal";
import Basket from "./pages/Basket";


export const publicRoutes = [
    {path: '/', element: <IndexPage/>},
    {path: '/login', element: <Auth/>},
    {path: '/reg', element: <Auth/>},
    {path: '/reset_pass', element: <ResetPass/>},
    {path: '/reset_pass/:activationLink', element: <ResetPass/>},
    {path: '/payment_and_delivery', element: <PaymentAndDelivery/>},
    {path: '/category/:id', element: <CategoryPage/>},
    {path: '/product/:id', element: <ProductPage/>},
    {path: '/bonus', element: <BonusPage/>},
    {path: '/royal', element: <Royal/>},
    {path: '/basket', element: <Basket/>},

]

export const authRoutes = [

    {path: '/', element: <IndexPage/>},
    {path: '/user', element: <UserPage/>},
    {path: '/payment_and_delivery', element: <PaymentAndDelivery/>},
    {path: '/category/:id', element: <CategoryPage/>},
    {path: '/product/:id', element: <ProductPage/>},
    {path: '/bonus', element: <BonusPage/>},
    {path: '/royal', element: <Royal/>},
    {path: '/basket', element: <Basket/>},

]

export const adminRoutes = [
    {path: '/admin', element: <Admin/>},
]