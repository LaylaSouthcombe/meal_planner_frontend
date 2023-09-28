import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import sookiNavLog from '../../images/sookiText.png'

import "./style.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user_state);

  const backendUrl = "https://mealplannerserver.herokuapp.com/";
  const route = "logout/";

  let navigate = useNavigate();
  const onBtnClick = (e) => {
    e.preventDefault();
    axios.get(`${backendUrl}${route}`, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({ type: "SET USER STATE", payload: false });
    navigate("/");
  };
  ////////////////////////////////////////// un comment when we can check user state
  // const [user, setUser] = useState(false)

  // const renderLinks = () => {
  //   if (user) {
  //     return (
  //       <>
  //         <li><Link activeClass="active" onClick={(e) => { onBtnClick(e) }} offset={-200}>Logout</Link></li>
  //         <li><Link activeClass="active" offset={-320}>Preferences</Link></li>)
  //       </>
  //     )
  //   } else
  //     return (
  //       <>
  //         <li><Link activeClass="active" onClick={(e) => {
  //           e.preventDefault()
  //           navigate("/login")
  //         }} offset={-230}>Login</Link></li>
  //       </>
  //     )
  // }
  ////////////////////////////////////////

  const [display, setDisplay] = useState("none");
  const [iconImg, setIconImg] = useState("fa fa-bars");

  const openSideNav = (e) => {
    e.preventDefault();
    if (display === "block") {
      setDisplay("none");
      setIconImg("fa fa-bars");
    } else {
      setDisplay("block");
      setIconImg("fa-solid fa-xmark");
    }
  };
  const closeSideNav = (e) => {
    e.preventDefault();
    setDisplay("none");
    setIconImg("fa fa-bars");
  };

  return (
    <>
    <div className="sookiNavLog">
      <img src={sookiNavLog} alt="" />
    </div>
      <div className="topnav">
        <ul className="navBar" id="myLinks" >
        <li>
            <NavLink
              activeclass="active"
              to="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              activeclass="active"
              to="/mealplan"
              onClick={(e) => {
                e.preventDefault();
                navigate("/mealplan");
              }}
            >
              Meal plan
            </NavLink>
          </li>

          <li>
            <NavLink
              activeclass="active"
              to="/shoppinglist"
              onClick={(e) => {
                e.preventDefault();
                navigate("/shoppinglist");
              }}
            >
              Shopping list
            </NavLink>
          </li>

          <li>
            <NavLink
              activeclass="active"
              to="/history"
              onClick={(e) => {
                e.preventDefault();
                navigate("/history");
              }}
            >
              History
            </NavLink>
          </li>

          <li>
            <NavLink
              activeclass="active"
              to="/preferences"
              onClick={(e) => {
                e.preventDefault();
                navigate("/preferences");
              }}
            >
              Preferences
            </NavLink>
          </li>

          {userState === true && (
          <li
            onClick={(e) => {
              onBtnClick(e);
            }}
          >
            Logout
          </li>
          )}
          {userState === false && (
          <li
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Login
          </li>
          )}
        </ul>
      </div>
      <div className="sidenav">
        <button data-testid="side" className="navIcon" onClick={openSideNav}>
          <i className={iconImg}></i>
        </button>
      </div>

      <div
        data-testid="modal"
        className="sideModal"
        style={{ display: display }}
      >
        <ul className="sideNavBar">
          <li>
            <NavLink
              activeclass="active"
              to="/"
              onClick={(e) => {
                e.preventDefault();
                closeSideNav(e);
                navigate("/");
              }}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              activeclass="active"
              to="/mealplan"
              onClick={(e) => {
                e.preventDefault();
                closeSideNav(e);
                navigate("/mealplan");
              }}
            >
              Meal plan
            </NavLink>
          </li>

          <li>
            <NavLink
              activeclass="active"
              to="/shoppinglist"
              onClick={(e) => {
                e.preventDefault();
                closeSideNav(e);
                navigate("/shoppinglist");
              }}
            >
              Shopping list
            </NavLink>
          </li>

          <li>
            <NavLink
              activeclass="active"
              to="/history"
              onClick={(e) => {
                e.preventDefault();
                closeSideNav(e);
                navigate("/history");
              }}
            >
              History
            </NavLink>
          </li>

          <li>
            <NavLink
              activeclass="active"
              to="/preferences"
              onClick={(e) => {
                e.preventDefault();
                closeSideNav(e);
                navigate("/preferences");
              }}
            >
              Preferences
            </NavLink>
          </li>


          {userState === true && (
          <li
            onClick={(e) => {
              closeSideNav(e)
              onBtnClick(e);
            }}
          >
            Logout
          </li>
          )}
          {userState === false && (
          <li
            onClick={(e) => {
              e.preventDefault();
              closeSideNav(e);
              navigate("/login");
            }}
          >
            Login
          </li>
          )}

        </ul>
      </div>
    </>
  );
};

export default NavBar;
