import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Styles from "./sidebar.module.css"




import SideBarStyle from '../SideBar/sidebar.module.css';



import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useToast } from "../../../Context/ToastContext";
import ChangePass from "../ChangePass/ChangePass";
import SideBar from "./SideBar";

export default function SideBarMobile() {

    const { setLoginUser, baseUrl, requestHeaders, loginUser, ChangePassword } = useAuth();
    let { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const { getToast } = useToast();
    const navigate = useNavigate();
    const [placeholder, setPlaceholder] = useState<Placeholders>({
        oldPassword: 'Enter your old password',
        newPassword: 'Enter your new password',
        confirmNewPassword: 'Confirm your new password',
    });
    const [showPassword, setShowPassword] = useState({
        oldPassword: true,
        newPassword: true,
        confirmNewPassword: true,
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [iconRotation, setIconRotation] = useState(1);
    let [isCollapse, setIsCollapse] = useState(true);
    let [collapsedWidth, setCollapsedWidth] = useState("100%");

    const updateCollapsedWidth = () => {
        const width = window.innerWidth;
        if (width <= 576) {
            setCollapsedWidth("100%");

        } else {
            setCollapsedWidth("0%");
        }
    };

    useEffect(() => {
        updateCollapsedWidth();
        window.addEventListener('resize', updateCollapsedWidth);
        return () => window.removeEventListener('resize', updateCollapsedWidth);
    }, []);

    const makeSomeChamge = () => {
        return (
            <ChangePass />

        )
    }

    function logout() {
        localStorage.removeItem("token");
        setLoginUser(null);
        navigate("/login");
    }

    // ?============================================================================================
    interface PasswordState {
        oldPassword: boolean;
        newPassword: boolean;
        confirmNewPassword: boolean;
    }

    interface Placeholders {
        oldPassword: string;
        newPassword: string;
        confirmNewPassword: string;
    }

    const togglePassword = (field: keyof PasswordState) => {
        setShowPassword((prevState) => ({ ...prevState, [field]: !prevState[field] }));
    };

    const handleCollapse = () => {
        setIsCollapse(!isCollapse);
        setIconRotation(prevRotation => prevRotation === 1 ? -1 : 1);
    }

    const onSubmit = async (data: any) => {
        try {

            let response = await axios.put(`${baseUrl}/Users/ChangePassword`, data,
                {
                    headers: requestHeaders
                });



            getToast("success", response.data.message)
            logout()
            console.log(data);

        }
        catch (error) {

            console.log(error);
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

                                <NavLink to="">
                                    <i className="fa-solid fa-house iconssidebar"></i>
                                    Home</NavLink>

                            </li>
                            <li className={Styles.liSidebar}>
                                <NavLink to="users">
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
                            <li className={Styles.liSidebar}>
                                <NavLink className={Styles.liSidebar} to="logout">
                                    <i className="fa-solid fa-right-from-bracket iconssidebar"></i>
                                    logout</NavLink>
                            </li>

                        </ul>




                    </div>


                </div>

            </div>
        </>
    )
}
