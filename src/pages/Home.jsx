import React from 'react'
import SearchBar from 'components/SearchBar'
import { Link } from 'react-router-dom'

function Home(props) {
    return (
        <div className="page-wrapper home">
            <div className="home-wrapper d-flex flex-column">
                <Link to="/main" className="home-title mb-1">
                    onBoard
                </Link>
                <SearchBar curUrl="home" search={props.search} setSearch={props.setSearch} />
            </div>
        </div>
    )
}

export default Home
