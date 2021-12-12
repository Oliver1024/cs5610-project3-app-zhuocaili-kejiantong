import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "commons/axios";

function JobShow({ user, setUser, setSearch }) {
  const LOADING = "LOADING";
  const POSITIVE = "POSITIVE";
  const NEGATIVE = "NEGATIVE";
  const navigate = useNavigate();
  const [curStatus, setCurStatus] = useState(LOADING);
  const [appliedStatus, setAppliedStatus] = useState(LOADING);
  const [job, setJob] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState(LOADING);
  const id = window.location.pathname.replace("/job/", "");

  const handleAddToFavorites = async () => {
    await axios
      .post(`/api/users/favorites/add`, { id: id, status: "" })
      .then((response) => {
        toast.success(response.data.message);
        setFavoriteStatus(POSITIVE);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    const id = window.location.pathname.replace("/job/", "");
    axios
      .get(`/api/jobs/job/${id}`)
      .then((res) => {
        setJob(res.data);
        setCurStatus(POSITIVE);
      })
      .catch((err) => {
        toast.error("Error is found")
      });
  }, []);

  useEffect(() => {
    const id = window.location.pathname.replace("/job/", "");
    axios.get("/api/users/favorites").then((response) => {
      const idx = response.data.findIndex(
        (favorite) => !!favorite.job && favorite.job._id === id
      );
      if (idx !== -1) {
        setFavoriteStatus(POSITIVE);
        setAppliedStatus(response.data[idx].status);
      } else setFavoriteStatus(NEGATIVE);
    });
  }, []);

  const handleStatusChange = async (data) => {
    const id = window.location.pathname.replace("/job/", "");
    await axios
      .put(`/api/users/favorites/${id}`, { status: data })
      .then((response) => {
        setAppliedStatus(response.data.status);
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  function create() {
    return <div dangerouslySetInnerHTML={{ __html: job.jobDescription }} />;
  }

  const handleDelete = () => {
    const id = window.location.pathname.replace("/job/", "");
    axios
      .delete(`/api/jobs/job/${id}`)
      .then((response) => {
        navigate("/posts");
        toast.success("Successfully deleted");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleRemoveFromFavorites = async () => {
    axios
      .post(`/api/users/favorites/remove`, { id })
      .then((response) => {
        toast.success(response.data.message);
        setFavoriteStatus(NEGATIVE);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  function renderHeader() {
    if (favoriteStatus === LOADING) return null;
    else if (user.email !== job.posterEmail) {
      if (favoriteStatus === POSITIVE) {
        return (
          <div>
            <div
              className="btn-job d-flex justify-content-center align-items-center mx-3 mb-3"
              onClick={() => handleRemoveFromFavorites()}
            >
              Unlike
            </div>
            <select
              className="form-select btn-job mx-3 text-center status d-flex justify-content-center"
              value={appliedStatus}
              onChange={(e) => {
                handleStatusChange(e.target.value);
              }}
            >
              <option value="Not Started">Not Started</option>
              <option value="Applied">Applied</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        );
      } else {
        return (
          <div
            className="btn-job d-flex justify-content-center align-items-center mx-3"
            onClick={() => handleAddToFavorites()}
          >
            {" "}
            <FontAwesomeIcon icon={faHeart} className="heart" />
            Favorite
          </div>
        );
      }
    } else return null;
  }

  function renderFooter() {
    if (favoriteStatus === LOADING) return null;
    else {
      return (
        <div className="d-flex align-self-center">
          {user.username &&
          user.email !== job.posterEmail &&
          favoriteStatus === POSITIVE ? (
            <a
              href={`mailto:${job.contact}`}
              className="btn-job d-flex justify-content-center align-items-center mx-3"
            >
              <FontAwesomeIcon icon={faEnvelope} className="heart" />
              Recruiter
            </a>
          ) : (
            <div></div>
          )}
          {user.username && user.email === job.posterEmail ? (
            <React.Fragment>
              <Link
                to={`/edit/${id}`}
                className="btn-job d-flex justify-content-center align-items-center mx-3"
              >
                Edit
              </Link>
              <div
                className="btn-job d-flex justify-content-center align-items-center mx-3 bg-red"
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete
              </div>
            </React.Fragment>
          ) : (
            <div></div>
          )}
        </div>
      );
    }
  }

  function render() {
    if (curStatus === LOADING) return null;
    else {
      return (
        <React.Fragment>
          <NavBar user={user} setUser={setUser} setSearch={setSearch} />
          <div className="page-wrapper jobshow d-flex w-100 justify-content-center">
            <div className="jobshow-wrapper d-flex flex-column jobshow-mobile">
              <div className="jobshow-header d-flex justify-content-between">
                <div
                  className="btn-job d-flex justify-content-center align-items-center "
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  {" "}
                  {"<"} Back
                </div>
                {renderHeader()}
              </div>
              <div className="jobshow-content text-center d-flex flex-column align-items-center">
                <div className="card-title job-title jobshow-title">
                  {job.title}
                </div>
                <div className="info money mb-3">
                  <p className="card-text">
                    <FontAwesomeIcon icon={faMoneyBill} /> ${job.salary}
                  </p>
                </div>
                {job.image !== "" ? (
                  <img src={job.image} className="job-image" alt=""/>
                ) : null}
                <div className="d-flex">
                  <div className="text-muted job-subtitle mb-3 mx-3">
                    {job.companyName}
                  </div>
                  <div className="text-muted job-subtitle mb-3 mx-3">
                    {job.location}
                  </div>
                </div>
                <div className="description-wrapper mb-3 mt-3">
                  <p className="card-text text-muted text-start"></p>
                  <div>{create()}</div>
                </div>
                <div className="job-footer mt-5">{job.createdAt}</div>
              </div>
              {renderFooter()}
            </div>
          </div>
        </React.Fragment>
      );
    }
  }

  return render();
}

export default JobShow;
