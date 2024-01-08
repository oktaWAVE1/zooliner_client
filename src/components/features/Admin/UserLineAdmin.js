import React from 'react';
import telephoneParser from "../../../utils/telephoneParser";

const UserLineAdmin = ({user, showUser}) => {
    return (
        <div>
            <div className="line w-100">
                <div className="px-2 pointer" onClick={() => showUser(user)}>{user.id}. {user.name}</div>
                <div className="px-2"><a href={`tel:${user?.telephone &&
                telephoneParser(user.telephone)}`}>{user.telephone}</a></div>
                <div className="px-2">{user.email}</div>
                <div className="px-2">{user.address}</div>
            </div>
            <hr className="my-1" />
        </div>
            

    );
};

export default UserLineAdmin;