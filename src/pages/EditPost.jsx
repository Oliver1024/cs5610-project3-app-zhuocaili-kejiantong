import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "commons/axios";
import "styling/jobshow.css";
import "styling/job.css";
import "styling/login-register.css";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

function EditPost(props) {
  const navigate = useNavigate();
  const [inputImage, setInputImage] = useState(undefined);

  const id = window.location.pathname.replace("/edit/", "");
  const [content, setContent] = useState("");
  const [post, setPost] = useState(async () => {
    await axios
      .get(`/api/jobs/job/${id}`)
      .then((response) => {
        setPost(response.data);
        setContent(response.data.jobDescription);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  });

  function onSubmit() {
    const id = window.location.pathname.replace("/edit/", "");
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
          .put(`/api/jobs/job/${id}`, {
            ...post,
            image: data.url,
            jobDescription: content,
          })
          .then((response) => {
            navigate(`/job/${id}`);
            toast.success("Successful");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      })
      .catch((err) => toast.error(err));
  }

  const editor = useRef(null);

  const config = {
    readonly: false,
  };

  return (
    <div className="page-wrapper jobshow d-flex w-100 justify-content-center edit-wrapper-mobile">
      <div className="jobshow-wrapper d-flex flex-column jobshow-wrapper-mobile">
        <div className="jobshow-header d-flex justify-content-between">
          <div
            className="btn-job d-flex justify-content-center align-items-center"
            onClick={() => {
              navigate("/posts", { replace: true });
            }}
          >
            {" "}
            {"<"} Back
          </div>
        </div>
        <div className="jobshow-content text-center d-flex flex-column align-items-center ">
          <div className="card-title job-title jobshow-title">Edit Job</div>
          <div className="mb-2 input-group d-flex flex-column">
            <div className="input-group d-flex flex-row w-100 justify-content-between">
              <div className="input-group d-flex flex-column  w-50">
                <label className="input-label">Job Title</label>
                <input
                  type="text"
                  className={`input-info text-center `}
                  value={post.title}
                  onChange={(e) => {
                    setPost({
                      ...post,
                      title: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="input-group d-flex flex-column  w-50">
                <label className="input-label">Salary</label>
                <input
                  type="number"
                  className={`input-info text-center`}
                  value={post.salary}
                  onChange={(e) => {
                    setPost({
                      ...post,
                      salary: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mb-2 input-group d-flex flex-column">
            <div className="input-group d-flex flex-row w-100 justify-content-between">
              <div className="input-group d-flex flex-column  w-50">
                <label className="input-label">Company Name</label>
                <input
                  type="text"
                  className={`input-info text-center`}
                  value={post.companyName}
                  onChange={(e) => {
                    setPost({
                      ...post,
                      companyName: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="input-group d-flex flex-column  w-50">
                <label className="input-label">Location</label>
                <input
                  type="text"
                  className={`input-info text-center`}
                  value={post.location}
                  onChange={(e) => {
                    setPost({
                      ...post,
                      location: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mb-2 input-group d-flex flex-column">
            <div className="input-group d-flex flex-row w-100 justify-content-between">
              <div className="input-group d-flex flex-column  w-50">
                <label className="input-label">Contact Email</label>
                <input
                  type="text"
                  className={`input-info text-center`}
                  value={post.contact}
                  onChange={(e) => {
                    setPost({
                      ...post,
                      contact: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="input-group d-flex flex-column w-50 mb-2">
                <label className="input-label">Website (optional)</label>
                <input
                  type="text"
                  className={`input-info text-center`}
                  value={post.companyWebsite}
                  onChange={(e) => {
                    setPost({
                      ...post,
                      companyWebsite: e.target.value,
                    });
                  }}
                />
              </div>
              <div class="mb-3 d-flex w-100 flex-column align-items-center">
                <label className="input-label">
                  Company Picture (optional)
                </label>
                <input
                  className="form-control w-50"
                  type="file"
                  name="image"
                  onChange={(e) => {
                    setInputImage(e.target.files[0]);
                  }}
                />
                {post.image !== "" ? (
                  <div className="d-flex flex-column">
                    <label className="input-label text-muted ">
                      Previous Image
                    </label>
                    <img src={post.image} className="job-image-prev" alt="" />
                  </div>
                ) : null}
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
              onBlur={(newContent) => setContent(newContent)}
              onChange={(newContent) => {}}
            />
          </div>
          <div
            className="btn-job d-flex justify-content-center align-items-center mt-5"
            onClick={() => {
              onSubmit();
            }}
          >
            Confirm
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
