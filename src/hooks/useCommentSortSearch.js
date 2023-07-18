import {useMemo} from "react";

export const useCommentSortSearch = (comments, searchQuery, newOnly) => {

    const sortedComments = [...comments].sort((a,b) => b['createdAt'].localeCompare(a['createdAt'])).filter(
        a => newOnly ? a['viewed']===false : a)
    const searchedComments = useMemo(() => {
        if(searchQuery)
        {

            return (sortedComments.filter(u => u.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.comment.toLowerCase().includes(searchQuery.toLowerCase())
            ))

        }
        else {
            return (sortedComments)
        }
    }, [searchQuery, comments, newOnly])
    return searchedComments
}