import React, { useState, useEffect } from 'react'
import axios from 'commons/axios'
import { Link } from 'react-router-dom'
import NavBar from 'components/NavBar'
import JobPost from 'components/JobPost'
import "styling/main.css"
import 'styling/jobshow.css'

function Posts({ user, setUser, setSearch }) {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get('/api/jobs/posts').then(
            response => {
                setPosts(response.data)
            }
        )
    }, [])

    return (
        <React.Fragment>
            <NavBar user={user} setUser={setUser} setSearch={setSearch} />
            <div className="page-wrapper main d-flex flex-column w-100 align-items-center">
                <div className="posts-wrapper d-flex flex-column w-100 justify-content-center align-items-center">
                    <div className="card-title job-title jobshow-title text-center posts-title">{user.username}'s Posts</div>
                    <Link to="/create" className="btn-job d-flex justify-content-center align-items-center mx-3 mb-3">Post a new job</Link>
                    {posts.map(post => (<JobPost user={user} job={post} />)
                    )}
                </div>
            </div>
        </React.Fragment>

    )
}

export default Posts
