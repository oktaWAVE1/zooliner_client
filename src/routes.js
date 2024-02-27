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
import BasketPage from "./pages/BasketPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import SuccessPage from "./pages/SuccessPage";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import AdminProductPage from "./pages/AdminProductPage";
import Contacts from "./pages/Contacts";
import PersonalDataProcessing from "./pages/PersonalDataProcessing";
import Check from "./pages/Check";
import FailedAuthPage from "./pages/FailedAuthPage";
import StocksPage from "./pages/StocksPage";


export const publicRoutes = [
    {path: '/', element: <IndexPage/>},
    {path: '/contacts', element: <Contacts/>},
    {path: '/login', element: <Auth/>},
    {path: '/reg', element: <Auth/>},
    {path: '/reset_pass', element: <ResetPass/>},
    {path: '/reset_pass/:activationLink', element: <ResetPass/>},
    {path: '/payment_and_delivery', element: <PaymentAndDelivery/>},
    {path: '/category/:id', element: <CategoryPage/>},
    {path: '/product/:id', element: <ProductPage/>},
    {path: '/bonus', element: <BonusPage/>},
    {path: '/royal', element: <Royal/>},
    {path: '/basket', element: <BasketPage/>},
    {path: '/order_confirmation/:accessLink', element: <OrderConfirmationPage/>},
    {path: '/success', element: <SuccessPage />},
    {path: '/personal_data', element: <PersonalDataProcessing/>},
    {path: '/check', element: <Check/>},
    {path: '/failed_auth', element: <FailedAuthPage/>},

]

export const authRoutes = [

    {path: '/', element: <IndexPage/>},
    {path: '/contacts', element: <Contacts/>},
    {path: '/user', element: <UserPage/>},
    {path: '/payment_and_delivery', element: <PaymentAndDelivery/>},
    {path: '/category/:id', element: <CategoryPage/>},
    {path: '/product/:id', element: <ProductPage/>},
    {path: '/bonus', element: <BonusPage/>},
    {path: '/royal', element: <Royal/>},
    {path: '/basket', element: <BasketPage/>},
    {path: '/order_confirmation/:accessLink', element: <OrderConfirmationPage/>},
    {path: '/success', element: <SuccessPage />},
    {path: '/personal_data', element: <PersonalDataProcessing/>},



]

export const adminRoutes = [
    {path: '/admin', element: <Admin/>},
    {path: '/admin/orders', element: <AdminOrders />},
    {path: '/admin/users', element: <AdminUsers />},
    {path: '/admin/products', element: <AdminProductPage />},
    {path: '/admin/stocks', element: <StocksPage />}
]