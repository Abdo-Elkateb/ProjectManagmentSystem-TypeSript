import React, { useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import Styles from "./sidebar.module.css"
import { useToast } from "../../../Context/ToastContext";




export default function SideBarMobile() {

    const { logout } = useAuth();

    const { getToast } = useToast();

    const timeoutRef = useRef<number>();

    const navigate = useNavigate();

    function logOutFromDashborad() {
        if (logout) {
            getToast("success", "Logout in Successfuly");
            timeoutRef.current = setTimeout(() => {
                navigate("/login", { replace: true });
            }, 4000);
        }
    }
    // nav .active {
    //     background-color: #EF9B28;
    //     padding: 9px 20%;
    //     transition: all .3s;

    // }
    const navLinkStyles = ({ isActive }) => {
        return {
            backgroundColor: isActive ? "#EF9B28" : "none",
            padding: isActive ? "9px 20%" : "none",
            transition: isActive ? "all .3s" : "none",
        }

    }

    return (
        <>

            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="offcanvasControl offcanvas offcanvas-start" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <button type="button" className="btn-close bg-light" data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="offcanvas-body">
                    <div className="d-flex w-100 h-100 justify-content-end align-items-center g-lg-2">
                        <ul className="w-100 text-center">
                            <li className={Styles.liSidebar}>
                                <NavLink style={navLinkStyles} to="" end>
                                    <i className="fa-solid fa-user iconssidebar"></i>
                                    Home</NavLink>
                            </li>
                            <li className={Styles.liSidebar}>
                                <NavLink style={navLinkStyles} to="users">
                                    <i className="fa-solid fa-user iconssidebar"></i>
                                    Users</NavLink>
                            </li>
                            <li className={Styles.liSidebar}>
                                <NavLink style={navLinkStyles} to="projects">
                                    <i className="fa-solid fa-diagram-project iconssidebar"></i>
                                    Projects</NavLink>
                            </li>
                            <li className={Styles.liSidebar}>
                                <NavLink style={navLinkStyles} className={Styles.liSidebar} to="tasks">
                                    <i className="fa-solid fa-list-check iconssidebar"></i>
                                    Tasks</NavLink>
                            </li>
                            <li className={Styles.liSidebar}>

                                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                    <h2>gjgjg</h2>
                                </div>
                                {/* <NavLink style={navLinkStyles} className={Styles.liSidebar} to="changePassword">
                                    <i className="fa-solid fa-lock iconssidebar"></i>
                                    Change Password</NavLink> */}
<div>
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button>
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">Open modal for @fat</button>
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Open modal for @getbootstrap</button>
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">New message</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
   
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary">Send message</button>
        </div>
      </div>
    </div>
  </div>
</div>

       
                            </li>

                            <li
                                className={Styles.liSidebar}
                                onClick={() => {
                                    logOutFromDashborad()
                                }}
                            >
                                Logout
                            </li>

                        </ul>




                    </div>


                </div>

            </div>
        </>
    )
}
