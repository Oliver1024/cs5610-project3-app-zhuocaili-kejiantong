import React, { useEffect, useState } from "react";
import SearchBar from "components/SearchBar";
import "styling/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Dropdown } from "react-bootstrap";
import axios from "commons/axios";

function NavBar({ user, setUser, setSearch }) {
  const navigate = useNavigate();

  const LOGGEDIN = "LOGGEDIN";
  const LOGGEDOUT = "LOGGEDOUT";
  const LOADING = "LOADING";

  const logout = () => {
    axios
      .get("/api/users/logout")
      .then((response) => {
        setUser({
          username: "",
          email: "",
          status: LOGGEDOUT,
        });
        toast.success("Successfully log out");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  function renderLoggedIn() {
    if (user.status === LOGGEDIN) {
      return (
        <React.Fragment>
          <Dropdown>
            <Dropdown.Toggle
              variant="warning"
              className="navbar-btn-onboard btn-profile-menu"
              id="dropdown-basic"
            >
              <div>
                {user.image !== "" ? (
                  <img src={user.image} className="profile-image mx-3" alt="" />
                ) : null}
                {user.username}
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-auto dropdown-menu">
              <Dropdown.Item className="navbar-btn-onboard" href="/profile">
                profile
              </Dropdown.Item>
              <Dropdown.Item className="navbar-btn-onboard" href="/posts">
                posts
              </Dropdown.Item>
              <Dropdown.Item className="navbar-btn-onboard" href="/favorites">
                favorites
              </Dropdown.Item>
              <Dropdown.Item
                className="navbar-btn-onboard"
                onClick={() => {
                  logout();
                }}
              >
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Link to="/login" className="navbar-btn-onboard">
            Log In
          </Link>
          <Link to="/register" className="navbar-btn-onboard">
            Register
          </Link>
        </React.Fragment>
      );
    }
  }

  return (
    <div className="navbar-onboard">
      <Link to="/" className="nav-title-onboard" onClick={() => setSearch("")}>
        onBoard
      </Link>
      <div className="navbar-search">
        <SearchBar curUrl="nav" setSearch={setSearch} />
      </div>
      <div className="nav-content-onboard">
        {user.status === LOADING ? null : renderLoggedIn()}
      </div>
    </div>
  );
}

export default NavBar;
