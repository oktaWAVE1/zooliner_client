import {useMemo} from "react";

export const useBrandsSortSearch = (brands, searchQuery) => {

    const sortedBrands = [...brands].sort((a,b) => a.id - b.id)
    const searchedBrands = useMemo(() => {
        if(searchQuery)
        {

            return (sortedBrands.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                String(b.id).includes(searchQuery.toLowerCase())
            ))

        }
        else {
            return (sortedBrands)
        }
    }, [searchQuery, brands])
    return searchedBrands
}