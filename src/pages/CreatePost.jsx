import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "commons/axios";
import "styling/jobshow.css";
import "styling/job.css";
import "styling/login-register.css";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

function CreatePost({ user }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [inputImage, setInputImage] = useState(undefined);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  let email = user.email;

  const [post, setPost] = useState({
    title: "",
    companyName: "",
    companyWebsite: "",
    salary: 0,
    location: "",
    contact: email,
    image: "",
  });

  const navigate = useNavigate();
  // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const onSubmit = async (input) => {
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
          .post("/api/jobs/", {
            ...input,
            image: data.url,
            jobDescription: content,
          })
          .then((response) => {
            navigate("/posts");
            toast.success("Successful");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      });
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
          <div className="card-title job-title jobshow-title">Create Job</div>
          <div className="mb-2 input-group d-flex flex-column">
            <div className="input-group d-flex flex-row w-100 justify-content-between">
              <div className="input-group d-flex flex-column  w-50">
                <label className="input-label">Job Title</label>
                <input
                  type="text"
                  className={`input-info text-center `}
                  placeholder="required"
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
                  placeholder="required"
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
                  placeholder="required"
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
                  placeholder="required"
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
                  placeholder="required"
                  onChange={(e) => {
                    setPost({
                      ...post,
                      contact: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="input-group d-flex flex-column  w-50">
                <label className="input-label">Website (optional)</label>
                <input
                  type="text"
                  className={`input-info text-center`}
                  onChange={(e) => {
                    setPost({
                      ...post,
                      companyWebsite: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="input-label">Company Picture (optional)</label>
            <input
              className="form-control"
              type="file"
              name="image"
              onChange={(e) => {
                setInputImage(e.target.files[0]);
              }}
            />
          </div>
          <label className="input-label">Description</label>
          <div className="editor-wrapper text-start">
            <JoditEditor
              name="description"
              ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
              onChange={(newContent) => {}}
            />
          </div>
          <div
            className="btn-job d-flex justify-content-center align-items-center mt-5"
            onClick={() => {
              onSubmit(post);
            }}
          >
            Confirm
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
