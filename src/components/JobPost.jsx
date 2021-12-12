import React from 'react'
import { Link } from 'react-router-dom'
import "styling/job.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'

function JobPost(props) {

    const job = props.job

    return (
        <Link to={`/job/${job._id}`} className="card job-wrapper">
            <div className="card-body job-body">
                <div className="card-title job-title jobshow-title">{job.title}</div>

                <div className="text-muted job-subtitle mb-3">{job.location}</div>
                <div className="info money mb-3">
                    <p className="card-text"><FontAwesomeIcon icon={faMoneyBill} /> ${job.salary}</p>
                </div>
            </div>
            <div className="job-footer">
                <div className="info money mb-3 red">
                    <p className="card-text"> {props.status}</p>
                </div>
                Posted: {job.createdAt}
            </div >
        </Link>
    )
}

export default JobPost
