import {useMemo} from "react";

export const useUsersSearch = (users, searchQuery) => {

    const searchedUsers = useMemo(() => {
        if(searchQuery.length>0){
            return (users.filter(user =>
                (user?.name && user.name.toLowerCase().includes(searchQuery.toLowerCase()))
                || (user?.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
                || (user?.telephone && user.telephone.toLowerCase().includes(searchQuery.toLowerCase()))
                || (user?.address && user.address.toLowerCase().includes(searchQuery.toLowerCase()))
                || (user?.id && String(user.id).includes(searchQuery.toLowerCase()))
            ))
        }
        else {
            return (users)
        }
    }, [searchQuery, users])
    return searchedUsers
}