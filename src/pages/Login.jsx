import React, { useState } from 'react'
import axios from 'commons/axios'
import "styling/login-register.css"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login({ user, setUser }) {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })


    const handleClick = async () => {
        await axios.post('/api/users/authenticate', userData)
            .then(response => {
                navigate("/main", { replace: true })
                setUser({
                    ...user,
                    status: 'LOGGEDIN'
                })
                toast.success("Hello " + response.data.username + ", welcome back to onBoard!")
            }
            ).catch(error => {
                toast.error(error.response.data.message)
            })
    }

    return (
        <div className="page-wrapper login d-flex w-100 justify-content-center align-items-center flex-column">
            <Link to="/" className="nav-title-onboard mb-3">
                onBoard
            </Link>
            <div className="login-wrapper text-center d-flex flex-column justify-content-center align-items-center" >
                <div className="login-title mb-2">
                    Log In
                </div>
                <div className="mb-2 input-group d-flex flex-column">
                    <label className="input-label" >Email Address</label>
                    <input type="email" className="input-info" onChange={(e) => {
                        setUserData({
                            ...userData,
                            email: e.target.value
                        })
                    }} />
                </div>
                <div className="mb-4 input-group d-flex flex-column">
                    <label className="input-label" >Password</label>
                    <input type="password" className="input-info" onChange={(e) => {
                        setUserData({
                            ...userData,
                            password: e.target.value
                        })
                    }} />
                </div>
                <div className="btn btn-form mb-2" onClick={() => {
                    handleClick()
                }}>Submit</div >
                <Link to="/register" className="btn-sec mb-3">New to onBoard? Create an account</Link>
            </div>

        </div >
    )
}

export default Login
