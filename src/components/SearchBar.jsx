import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import 'styling/searchbar.css'

function SearchBar({curUrl, setSearch}) {
    const [inputState, setInputState] = useState("")
    let navigate = useNavigate()
    let className = null
    let btnClass = null

    if (curUrl === "home") {
        className = "d-flex search-bar"
        btnClass = "btn btn-outline-secondary btn-search"
    }
    if (curUrl === "nav") {
        className = "d-flex search-bar-nav"
        btnClass = "btn btn-outline-secondary btn-search-nav"
    }


    return (
        <div className={className}>
            <input className="form-control search" type="search" placeholder="Get you on board today" 
                onChange={
                    (e) => {
                        setInputState(e.target.value)
                    }
                } />
            <div className={btnClass} onClick={() => {
                navigate(`/main?search=${inputState}`)
                setSearch(inputState)
            }}>Search</div>
        </div >
    )
}

export default SearchBar
