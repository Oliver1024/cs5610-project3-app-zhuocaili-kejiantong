import React, { useState, useEffect } from 'react'
import axios from 'commons/axios'
import NavBar from 'components/NavBar'
import JobPost from 'components/JobPost'
import "styling/main.css"
import 'styling/jobshow.css'

function Favorites({ user, setUser, setSearch }) {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get('/api/users/favorites').then(
            response => {
                setPosts(response.data)
            }
        )
    }, [])

    return (
        <React.Fragment>
            <NavBar user={user} setUser={setUser} setSearch={setSearch} />
            <div className="page-wrapper main d-flex flex-column w-100  align-items-center">
                <div className="posts-wrapper">
                    <div className="card-title job-title jobshow-title text-center posts-title">{user.username}'s Favorites</div>
                    {posts.map(post => post.job ? (<JobPost job={post.job} status={post.status} />) : null
                    )}
                </div>
            </div>
        </React.Fragment>

    )
}

export default Favorites
