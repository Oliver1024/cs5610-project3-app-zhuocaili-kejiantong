import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "commons/axios";
import { toast } from "react-toastify";

function UserProfile({ user, setUser }) {
  const navigate = useNavigate();

  const [inputImage, setInputImage] = useState({});

  const [userData, setUserData] = useState(async () => {
    await axios
      .get("/api/users/profile")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  });

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("file", inputImage);
    data.append("upload_preset", process.env.REACT_APP_CLOUD_UPLOAD_PRESET);
    data.append("api_key", process.env.REACT_APP_CLOUD_API_KEY);
    data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
    fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: "post",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        axios
          .put("/api/users/profile", { ...userData, image: data.url })
          .then((response) => {
            setUser({
              ...user,
              status: "LOADING",
            });
            navigate(-1);
            toast.success("Successfully update information");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="page-wrapper jobshow d-flex w-100 justify-content-center">
      <div className="jobshow-wrapper d-flex flex-column ">
        <div className="jobshow-header d-flex justify-content-between">
          <div
            className="btn-job d-flex justify-content-center align-items-center"
            onClick={() => {
              navigate(-1);
            }}
          >
            {" "}
            {"<"} Back
          </div>
        </div>
        <div className="jobshow-content text-center d-flex flex-column align-items-center">
          <div className="card-title job-title jobshow-title">Edit Profile</div>
          <div className="info mb-3" id="user-email">
            <p className="card-text">{user.email}</p>
          </div>
          <div className="mb-2 input-group d-flex flex-column">
            <div className="input-group d-flex flex-row w-100 justify-content-between">
              <div className="input-group d-flex flex-column  w-50">
                <label className="input-label">First Name</label>
                <input
                  type="text"
                  className={`input-info text-center `}
                  value={userData.firstName}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      firstName: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="input-group d-flex flex-column  w-50">
                <label className="input-label">Last Name</label>
                <input
                  type="text"
                  className={`input-info text-center `}
                  value={userData.lastName}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      lastName: e.target.value,
                    });
                  }}
                />
              </div>
              <div class="mt-3 d-flex w-100 flex-column align-items-center">
                <label className="input-label">
                  Profile Picture (optional)
                </label>
                <input
                  className="form-control w-50"
                  type="file"
                  name="image"
                  onChange={(e) => {
                    setInputImage(e.target.files[0]);
                  }}
                />
                {userData.image !== "" ? (
                  <div className="d-flex flex-column align-items-center">
                    <label className="input-label text-muted mt-3">
                      Previous Image
                    </label>
                    <img
                      src={userData.image}
                      className="profile-image-edit"
                      alt=""
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <button
            className="btn-job d-flex justify-content-center align-items-center mt-5"
            onClick={() => {
              handleSubmit();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
