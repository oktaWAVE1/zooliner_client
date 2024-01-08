import {useMemo} from "react";

export const useOrdersSortSearch = (orders, searchQuery) => {

    const searchedOrders = useMemo(() => {
        if(searchQuery.length>0){
            return (orders.filter(o => (o?.user && o.user.name.toLowerCase().includes(searchQuery.toLowerCase()))
                || (o?.user && o.user.email.toLowerCase().includes(searchQuery.toLowerCase()))
                || (o?.user && o.user.telephone.toLowerCase().includes(searchQuery.toLowerCase()))
                || o.status.toLowerCase().includes(searchQuery.toLowerCase())
                || String(o.orderNumber).includes(searchQuery.toLowerCase())
            ))
        }
        else {
            return (orders)
        }
    }, [searchQuery, orders])
    return searchedOrders
}