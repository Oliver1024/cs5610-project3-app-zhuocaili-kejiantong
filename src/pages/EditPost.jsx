import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'commons/axios'
import 'styling/jobshow.css'
import 'styling/job.css'
import "styling/login-register.css"
import { toast } from 'react-toastify'
import JoditEditor from "jodit-react";


function EditPost(props) {

    const navigate = useNavigate()

    const id = window.location.pathname.replace('/edit/', '');
    const [post, setPost] = useState(async () => {
        await axios.get(`/api/jobs/job/${id}`)
            .then(response => { setPost(response.data) })
            .catch(error => {
                toast.error(error.message)
            })
    })

    function onSubmit() {
        axios.put(`/api/jobs/job/${id}`, { ...post, jobDescription: content })
            .then(response => {
                toast.success('Successful')
            })
            .catch(err => {
                toast.error(err.message)
            })
    }

    const editor = useRef(null)
    const [content, setContent] = useState("")
    const config = {
        readonly: false
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
                                    <input type="text" className={`input-info text-center `} value={post.title} onChange={
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
                                    <input type="number" className={`input-info text-center`} value={post.salary} onChange={
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
                                    <input type="text" className={`input-info text-center`} value={post.companyName}
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
                                    <input type="text" className={`input-info text-center`} value={post.location}
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
                                    <input type="text" className={`input-info text-center`} value={post.contact}
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
                                    <input type="text" className={`input-info text-center`} value={post.companyWebsite}
                                        onChange={
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
                                value={post.jobDescription}
                                config={config}
                                tabIndex={1}
                                onBlur={newContent => setContent(newContent)}
                                onChange={newContent => { }}
                            />
                        </div>
                        <div className="btn-job d-flex justify-content-center align-items-center mt-5" onClick={() => { onSubmit() }} >Confirm</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default EditPost

