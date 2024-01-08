import {useMemo} from "react";

export const useCategorySortSearch = (categories, searchQuery) => {

    const sortedCategories = [...categories].sort((a,b) => (a.categoryId===0 ? a.id : a.categoryId) - (b.categoryId===0 ? b.id : b.categoryId))
    const searchedCategories = useMemo(() => {
        if(searchQuery){
            return (sortedCategories.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (b?.parent?.name && b.parent.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                String(b.id).includes(searchQuery.toLowerCase())
            ))
        }
        else {
            return (sortedCategories)
        }
    }, [searchQuery, categories])
    return searchedCategories
}