import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Main from "pages/Main";
import NotFound from "pages/NotFound";
import Login from "pages/Login";
import Register from "pages/Register";
import Posts from "pages/Posts";
import Favorites from "pages/Favorites";
import CreatePost from "pages/CreatePost";
import EditPost from "pages/EditPost";
import JobShow from "pages/JobShow";
import UserProfile from "pages/UserProfile";
import axios from "./commons/axios";

function Router() {
  const LOGGEDIN = "LOGGEDIN";
  const LOGGEDOUT = "LOGGEDOUT";
  const LOADING = "LOADING";

  const [user, setUser] = useState({
    status: LOADING,
    email: "",
    username: "",
    image: "",
  });

  useMemo(() => {
    axios
      .get("/api/users/currentUser")
      .then((response) => {
        setUser({
          username: response.data.username,
          email: response.data.email,
          image: response.data.image,
          status: LOGGEDIN,
        });
      })
      .catch((err) => {
        setUser((user) => ({
          ...user,
          status: LOGGEDOUT,
        }));
      });
  }, [user.status]);

  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home search={search} setSearch={setSearch} />}
        />
        <Route
          path="/main"
          element={
            <Main
              user={user}
              setUser={setUser}
              search={search}
              setSearch={setSearch}
            />
          }
        />
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route
          path="/register"
          element={<Register user={user} setUser={setUser} />}
        />
        <Route
          path="/job/:jobid"
          element={
            <JobShow user={user} setUser={setUser} setSearch={setSearch} />
          }
        />
        {user.status !== LOGGEDOUT ? (
          <Route path="/profile" element={<UserProfile user={user} setUser={setUser}/>} />
        ) : null}
        {user.status !== LOGGEDOUT ? (
          <Route path="/create" element={<CreatePost user={user} />} />
        ) : null}
        {user.status !== LOGGEDOUT ? (
          <Route path="/edit/:jobid" element={<EditPost user={user} />} />
        ) : null}
        {user.status !== LOGGEDOUT ? (
          <Route
            path="/posts"
            element={
              <Posts user={user} setUser={setUser} setSearch={setSearch} />
            }
          />
        ) : null}
        {user.status !== LOGGEDOUT ? (
          <Route
            path="/favorites"
            element={
              <Favorites user={user} setUser={setUser} setSearch={setSearch} />
            }
          />
        ) : null}
        <Route
          path="*"
          element={
            <NotFound
              user={user}
              setUser={setUser}
              search={search}
              setSearch={setSearch}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
