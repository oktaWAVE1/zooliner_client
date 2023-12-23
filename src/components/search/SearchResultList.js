import React from 'react';
import SearchItem from "./SearchItem";

const SearchBartList = ({searchResults}) => {
    return (
        <div className={"searchBarList"}>
            {searchResults.map(item =>
                <SearchItem key={item?.item.id} item={item?.item}/>
            )
            }
        </div>
    );
};

export const SearchResultList = React.memo(SearchBartList);