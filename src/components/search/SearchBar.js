import React, {useState} from 'react';
import useDebounce from "../../hooks/useDebounce";
import {SearchResultList} from "./SearchResultList";
import fuseSearch from "../../utils/fuseSearch";
import {useNavigate} from "react-router-dom";
import Search from "../../UI/svgs/search";

const SearchBar = ({...props}) => {

    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleSearch = () => {
        if (query.length>2){
            navigate(`/category/-1?query=${query}`)
        }
    };

    useDebounce(async() => {
            if (query?.length>=2) {
                await fuseSearch(query, 5).then(res => setSearchResults(res))
            }
        }, 600, [query]);

    return (
        <div className="searchBar">
            <div className="d-flex row">
                <input width="600px" className='px-2' placeholder="Поиск по каталогу..."
                       onBlur={() => {setTimeout(() => {
                    setSearchResults([])
                    setQuery('')
                },200)}}
                       onKeyUp={(e) => {if(e.key==="Enter"){
                           handleSearch()
                           setSearchResults([])
                           setQuery('')
                       }}}
                       value={query} onChange={e => setQuery(e.target.value)} />
                <button onClick={() => handleSearch()} className="search_btn"><span title='Поиск' style={{marginTop: "-4px"}}>
                                            <Search />
                                        </span></button>

            </div>
            {searchResults?.length > 0 &&
                <SearchResultList searchResults={searchResults}/>
            }
        </div>
    );
};

export default SearchBar;