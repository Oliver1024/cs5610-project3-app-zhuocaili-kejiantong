import React from 'react'
import NavBar from 'components/NavBar'

function NotFound({ user, setUser, search, setSearch }) {
    return (
        <React.Fragment>
            <NavBar user={user} setUser={setUser} search={search} setSearch={setSearch} />
            <div className="page-wrapper notfound d-flex w-100 justify-content-center align-items-center flex-column">
                <p className="notfound-title">
                    404
                </p>
                <p>
                    Ooops, you are in a mysterious zone
                </p>
            </div>
        </React.Fragment>
    )
}

export default NotFound
