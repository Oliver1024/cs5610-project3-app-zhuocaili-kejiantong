import React, { useState } from 'react'
import axios from 'commons/axios'
import "styling/login-register.css"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Register({ user, setUser }) {

    // const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        username: ''
    })
    const onSubmit = async () => {
        await axios.post('/api/users/register', userData)
            .then(response => {
                navigate("/main", { replace: true })
                setUser({
                    username: userData.username,
                    email: userData.email,
                    status: 'LOGGEDIN'
                })
                toast.success("Hello " + response.data.username + ", welcome back to onBoard!")
            }
            ).catch(error => {
                toast.error(error.message)
            })
    };

    return (
        <div className="page-wrapper login d-flex w-100 justify-content-center align-items-center flex-column">
            <Link to="/" className="nav-title-onboard mb-3">
                onBoard
            </Link>
            <div className="login-wrapper text-center d-flex flex-column justify-content-center align-items-center">
                <div className="login-title mb-2">
                    Register
                </div>
                <div className="mb-2 input-group d-flex flex-column">
                    <label className="input-label" >Email Address</label>
                    <input type="email" className={`input-info`} onChange={(e) => {
                        setUserData({
                            ...userData,
                            email: e.target.value
                        })
                    }}
                    />

                </div>
                <div className="mb-2 input-group d-flex flex-column">
                    <label className="input-label">Username</label>
                    <input type="text" className={`input-info`}
                        onChange={(e) => {
                            setUserData({
                                ...userData,
                                username: e.target.value
                            })
                        }} />
                </div>
                <div className="mb-4 input-group d-flex flex-column">
                    <label className="input-label" >Password</label>
                    <input type="password"
                        className={`input-info`}
                        onChange={(e) => {
                            setUserData({
                                ...userData,
                                password: e.target.value
                            })
                        }}
                    />
                </div>
                <button type="submit" className="btn btn-form mb-2" onClick={() => { onSubmit() }}>Submit</button>
                <Link to="/login" className="btn-sec mb-3">Already have an onBoard account? Log in here</Link>
            </div>

        </div>
    )
}

export default Register
