import React, { useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import Styles from "./sidebar.module.css"
import { useToast } from "../../../Context/ToastContext";



// import context from "react-bootstrap/esm/AccordionContext";

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
                    <div className="d-flex w-100 h-100 justify-content-center align-items-center g-lg-2">
                        <ul className="w-100 text-center">
                            <li className={Styles.liSidebar}>
                                <NavLink to="/">
                                    <i className="fa-solid fa-user iconssidebar"></i>
                                    Home</NavLink>
                            </li>
                            <li className={Styles.liSidebar}>
                                <NavLink to="/users">
                                    <i className="fa-solid fa-user iconssidebar"></i>
                                    Users</NavLink>
                            </li>
                            <li className={Styles.liSidebar}>
                                <NavLink to="projects">
                                    <i className="fa-solid fa-diagram-project iconssidebar"></i>
                                    Projects</NavLink>
                            </li>
                            <li className={Styles.liSidebar}>
                                <NavLink className={Styles.liSidebar} to="tasks">
                                    <i className="fa-solid fa-list-check iconssidebar"></i>
                                    Tasks</NavLink>
                            </li>
                            <li className={Styles.liSidebar}>
                                <NavLink className={Styles.liSidebar} to="changePassword">
                                    <i className="fa-solid fa-lock iconssidebar"></i>
                                    Change Password</NavLink>
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
