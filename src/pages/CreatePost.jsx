import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'commons/axios'
import 'styling/jobshow.css'
import 'styling/job.css'
import "styling/login-register.css"
import { toast } from 'react-toastify'
import JoditEditor from "jodit-react";

function CreatePost({ user }) {

    const editor = useRef(null)
    const [content, setContent] = useState('')

    const config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }

    const [post, setPost] = useState({
        title: "",
        companyName: "",
        companyWebsite: "",
        salary: 0,
        location: "",
        contact: ""
    })

    const navigate = useNavigate()
    // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const onSubmit = data => {
        axios.post('/api/jobs/', { ...data, jobDescription: content })
            .then(response => {
                navigate('/posts');
                toast.success('Successful')
            })
            .catch(err => {
                toast.error(err.message)
            })
    }

    return (
        <React.Fragment>
            <div className="page-wrapper jobshow d-flex w-100 justify-content-center">
                <div className="jobshow-wrapper d-flex flex-column ">
                    <div className="jobshow-header d-flex justify-content-between">
                        <div className="btn-job d-flex justify-content-center align-items-center" onClick={() => { navigate(-1) }}> {"<"} Back</div>
                    </div>
                    <div className="jobshow-content text-center d-flex flex-column align-items-center">
                        <div className="card-title job-title jobshow-title">Create Job</div>
                        <div className="mb-2 input-group d-flex flex-column">
                            <div className="input-group d-flex flex-row w-100 justify-content-between">
                                <div className="input-group d-flex flex-column  w-50">
                                    <label className="input-label">Job Title</label>
                                    <input type="text" className={`input-info text-center `} onChange={
                                        (e) => {
                                            setPost({
                                                ...post,
                                                title: e.target.value,
                                            })
                                        }
                                    } />
                                </div>
                                <div className="input-group d-flex flex-column  w-50">
                                    <label className="input-label">Salary</label>
                                    <input type="number" className={`input-info text-center`} onChange={
                                        (e) => {
                                            setPost({
                                                ...post,
                                                salary: e.target.value,
                                            })
                                        }
                                    } />
                                </div>
                            </div>
                        </div>
                        <div className="mb-2 input-group d-flex flex-column">
                            <div className="input-group d-flex flex-row w-100 justify-content-between">
                                <div className="input-group d-flex flex-column  w-50">
                                    <label className="input-label">Company Name</label>
                                    <input type="text" className={`input-info text-center`}
                                        onChange={
                                            (e) => {
                                                setPost({
                                                    ...post,
                                                    companyName: e.target.value,
                                                })
                                            }
                                        } />
                                </div>
                                <div className="input-group d-flex flex-column  w-50">
                                    <label className="input-label">Location</label>
                                    <input type="text" className={`input-info text-center`}
                                        onChange={
                                            (e) => {
                                                setPost({
                                                    ...post,
                                                    location: e.target.value,
                                                })
                                            }
                                        } />
                                </div>
                            </div>
                        </div>
                        <div className="mb-2 input-group d-flex flex-column">
                            <div className="input-group d-flex flex-row w-100 justify-content-between">
                                <div className="input-group d-flex flex-column  w-50">
                                    <label className="input-label">Contact Email</label>
                                    <input type="text" className={`input-info text-center`}
                                        onChange={
                                            (e) => {
                                                setPost({
                                                    ...post,
                                                    contact: e.target.value,
                                                })
                                            }
                                        } />
                                </div>
                                <div className="input-group d-flex flex-column  w-50">
                                    <label className="input-label">Website (optional)</label>
                                    <input type="text" className={`input-info text-center`} onChange={
                                        (e) => {
                                            setPost({
                                                ...post,
                                                companyWebsite: e.target.value,
                                            })
                                        }
                                    }

                                    />
                                </div>
                            </div>
                        </div>
                        <label className="input-label">Description</label>
                        <div className="editor-wrapper text-start">
                            <JoditEditor
                                name="description"
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={1}
                                onBlur={newContent => setContent(newContent)}
                                onChange={newContent => { }}
                            />
                        </div>
                        <div className="btn-job d-flex justify-content-center align-items-center mt-5" onClick={() => { onSubmit(post) }} >Confirm</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CreatePost

