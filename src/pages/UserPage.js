
import OrderList from "../components/features/OrderList";
import {observer} from "mobx-react-lite";
import UserEditForm from "../components/features/UserEditForm";
import UserBonus from "../components/features/UserBonus";

const UserPage = observer(() => {

    return (
        <div className='userPage'>
            <h1 className="mb-3">Страница пользователя: </h1>
            <UserBonus />
            <OrderList />
            <UserEditForm />
        </div>
    );
});

export default UserPage;