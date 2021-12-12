import React, { useState, useEffect } from "react";
import axios from "commons/axios";
import NavBar from "components/NavBar";
import JobPost from "components/JobPost";

function Favorites({ user, setUser, setSearch }) {
  const ALL = "All";

  const [appliedStatus, setAppliedStatus] = useState(ALL);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("/api/users/favorites").then((response) => {
      setPosts(response.data);
    });
  }, [appliedStatus]);

  function renderNavbar() {
    return <NavBar user={user} setUser={setUser} setSearch={setSearch} />;
  }

  function render() {
    if (appliedStatus === ALL) {
      return (
        <div>
          {posts.map((post) =>
            post.job ? <JobPost job={post.job} status={post.status} /> : null
          )}
        </div>
      );
    } else {
      return (
        <div>
          {posts.map((post) =>
            post.job && post.status === appliedStatus ? (
              <JobPost job={post.job} status={post.status} />
            ) : null
          )}
        </div>
      );
    }
  }

  return (
    <React.Fragment>
      {renderNavbar()}
      <div className="page-wrapper main d-flex flex-column w-100  align-items-center">
        <div className="posts-wrapper">
          <div className="card-title job-title jobshow-title text-center posts-title">
            {user.username}'s Favorites
          </div>
          <div className="d-flex w-100 justify-content-center mb-5">
            <select
              className="form-select btn-job mx-3 text-center status d-flex justify-content-center"
              value={appliedStatus}
              onChange={(e) => {
                setAppliedStatus(e.target.value);
              }}
            >
              <option value="All">All</option>
              <option value="Not Started">Not Started</option>
              <option value="Applied">Applied</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {render()}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Favorites;
