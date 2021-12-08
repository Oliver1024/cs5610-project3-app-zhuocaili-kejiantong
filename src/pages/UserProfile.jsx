import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'commons/axios'
import { toast } from 'react-toastify'

function UserProfile({ user, setUser }) {

    const navigate = useNavigate()

    const [userData, setUserData] = useState(async () => {
        await axios.get('/api/users/profile').then(response => { setUserData(response.data) })
            .catch(error => {
                toast.error(error.message)
            })
    })

    function handleSubmit() {
        axios.put('/api/users/profile', userData)
            .then(response => {
                toast.success(response.data.message)
            })
            .catch(error => {
                toast.error(error.message)
            })
    }


    return (
        <div className="page-wrapper jobshow d-flex w-100 justify-content-center" >
            <div className="jobshow-wrapper d-flex flex-column ">
                <div className="jobshow-header d-flex justify-content-between">
                    <div className="btn-job d-flex justify-content-center align-items-center" onClick={() => { navigate(-1) }}> {"<"} Back</div>
                </div>
                <div className="jobshow-content text-center d-flex flex-column align-items-center" >
                    <div className="card-title job-title jobshow-title">Edit Profile</div>
                    <div className="info mb-3" id="user-email">
                        <p className="card-text" >{user.email}</p>
                    </div>
                    <div className="mb-2 input-group d-flex flex-column">
                        <div className="input-group d-flex flex-row w-100 justify-content-between">
                            <div className="input-group d-flex flex-column  w-50">
                                <label className="input-label">First Name</label>
                                <input type="text" className={`input-info text-center `} value={userData.firstName}
                                    onChange={(e) => {
                                        setUserData({
                                            ...userData,
                                            firstName: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div className="input-group d-flex flex-column  w-50">
                                <label className="input-label">Last Name</label>
                                <input type="text" className={`input-info text-center `} value={userData.lastName}
                                    onChange={(e) => {
                                        setUserData({
                                            ...userData,
                                            lastName: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <button className="btn-job d-flex justify-content-center align-items-center mt-5" onClick={() => {
                        handleSubmit()
                    }}>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default UserProfile

