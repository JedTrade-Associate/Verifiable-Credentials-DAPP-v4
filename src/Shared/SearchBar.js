import { useHistory } from 'react-router-dom';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './FilterBar.css'
//fix this
const SearchBar = ({ searchContent, onSearchHandler, searchQuery }) => {
    const history = useHistory();
    let onSubmit = e => {
        // history.push(`?${searchContent}Search=${searchQuery}`)
        e.preventDefault()
    }

    // const searchBarStyle = {
    //     width: "500px",
    //     height: "40px",
    //     paddingLeft: "43px",
    // }
    const iconStyle = {
        position: "absolute",
        marginTop: "10px",
        marginLeft: "13px"
    }
    // const inputIconStyle = {
    //     width: "100%", 
    //     marginBottom: "10px"
    // }
    return(
        <>
        <form onSubmit={onSubmit} className="searchBar">
            <div className="input-icons">
                <FontAwesomeIcon icon={faSearch} style={iconStyle} />
                <input
                    type="text"
                    placeholder={`Search... ${searchContent}`}
                    value={searchQuery}
                    onChange={e => onSearchHandler(e.target.value)}
                    className="input search"
                />
            </div>
        </form>
        </>
    )
};

export default SearchBar;