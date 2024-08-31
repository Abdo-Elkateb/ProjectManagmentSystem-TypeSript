import React, { useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "../../../Context/AuthContext";
import Styles from "./sidebar.module.css"
import { NavLink, useNavigate } from "react-router-dom";
import { Modal, Navbar } from 'react-bootstrap';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';


import { useForm, FieldError } from 'react-hook-form';
import Style from '../SideBar/sidebar.module.css'
import axios from 'axios';

import { useToast } from "../../../Context/ToastContext";




export default function SideBarMobile() {

      function logOutFromDashborad() {
        if (logout) {
            getToast("success", "Logout in Successfuly");
            timeoutRef.current = setTimeout(() => {
                navigate("/login", { replace: true });
            }, 4000);
        }
    } 

     const { getToast } = useToast();
  const navigate = useNavigate();
  const timeoutRef = useRef<number>();

  const { setLoginUser, baseUrl, requestHeaders, loginUser, logout } = useAuth();
  let { register, handleSubmit, formState: { errors }, watch } = useForm();

  


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
  let [isCollapse, setIsCollapse] = useState(true);
  let [collapsedWidth, setCollapsedWidth] = useState("80px");

 

 

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
      console.log(data);

    }
    catch (error) {

      console.log(error);
    }
  }






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
                                <NavLink style={navLinkStyles} className={Styles.liSidebar} to="changePassword">
                                    <i className="fa-solid fa-lock iconssidebar"></i>
                                    Change Password</NavLink>
                            </li>
                            <Modal className='pt-4' show={show} onHide={handleClose}>
                                <Modal.Body className={`${Style.modalBody} form-container p-5 bg-main rounded-2 dark-tabel`}>
                                    <div>
                                        <p className='text-white pt-md-3'>welcome to APP</p>
                                        <h3 className='fw-bold mb-5 text-main position-relative'>Change Password</h3>
                                        <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column gap-2'>

                                            <div className={`${Style.height} `}>
                                                <div className={`${Style.inputContainer} ${errors.oldPassword && Style.inputError}`}>
                                                    <label htmlFor="oldpass" className="me-1">
                                                        Old Password
                                                    </label>
                                                    <div className="d-flex align-items-end">
                                                        <input
                                                            type={showPassword.oldPassword ? 'text' : 'password'}
                                                            className={`text-white flex-grow-1 pb-2 bg-transparent border-0 `}
                                                            placeholder={placeholder.oldPassword}
                                                            id="oldpass"
                                                            {...register('oldPassword', {
                                                                required: '* Old Password is required',
                                                                pattern: {
                                                                    value: /.{3,}/,
                                                                    message: '* Invalid Password'
                                                                }
                                                            })}
                                                            onFocus={() => setPlaceholder((prevPlaceholders) => ({ ...prevPlaceholders, oldPassword: '' }))}
                                                            onBlur={() => setPlaceholder((prevPlaceholders) => ({ ...prevPlaceholders, oldPassword: 'Enter your old password' }))}
                                                        />
                                                        <span
                                                            onClick={() => togglePassword('oldPassword')}
                                                            className={`text-white bg-inf ${Style.icon}`}>
                                                            {showPassword.oldPassword ?
                                                                <i className="fa-regular fa-eye"></i> :
                                                                <i className="fa-regular fa-eye-slash"></i>
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                {errors.oldPassword && <p className='text-warning mt-1'>{(errors.oldPassword as FieldError).message}</p>}
                                            </div>


                                            <div className={`${Style.height} `}>
                                                <div className={`${Style.inputContainer} ${errors.newPassword && Style.inputError}`}>
                                                    <label htmlFor="new" className="me-1">
                                                        New Password
                                                    </label>
                                                    <div className="d-flex align-items-end">
                                                        <input
                                                            type={showPassword.newPassword ? 'text' : 'password'}
                                                            className={`text-white flex-grow-1 pb-2 bg-transparent border-0 `}
                                                            placeholder={placeholder.newPassword}
                                                            id="new"
                                                            {...register('newPassword', {
                                                                required: '* New Password is required',
                                                                pattern: {
                                                                    value: /.{3,}/,
                                                                    message: '* Invalid Password'
                                                                }
                                                            })}
                                                            onFocus={() => setPlaceholder((prevPlaceholders) => ({ ...prevPlaceholders, newPassword: '' }))}
                                                            onBlur={() => setPlaceholder((prevPlaceholders) => ({ ...prevPlaceholders, newPassword: 'Enter your new password' }))}
                                                        />
                                                        <span
                                                            onClick={() => togglePassword('newPassword')}
                                                            className={`text-white ${Style.icon}`}>
                                                            {showPassword.newPassword ?
                                                                <i className="fa-regular fa-eye"></i> :
                                                                <i className="fa-regular fa-eye-slash"></i>
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                {errors.newPassword && <p className='text-warning mt-1'>{(errors.newPassword as FieldError).message}</p>}
                                            </div>


                                            <div className={`${Style.height} `}>
                                                <div className={`${Style.inputContainer} ${errors.confirmNewPassword && Style.inputError}`}>
                                                    <label htmlFor="confirm" className="me-1">
                                                        Confirm New Password
                                                    </label>
                                                    <div className="d-flex align-items-end">
                                                        <input
                                                            type={showPassword.confirmNewPassword ? 'text' : 'password'}
                                                            className={`text-white flex-grow-1 pb-2 bg-transparent border-0 `}
                                                            placeholder={placeholder.confirmNewPassword}
                                                            id="confirm"
                                                            {...register('confirmNewPassword', {
                                                                required: '* Please confirm your password',
                                                                validate: (value) =>
                                                                    value === watch('newPassword') ||
                                                                    "* Password isn't a match"
                                                            })}
                                                            onFocus={() => setPlaceholder((prevPlaceholders) => ({ ...prevPlaceholders, confirmNewPassword: '' }))}
                                                            onBlur={() => setPlaceholder((prevPlaceholders) => ({ ...prevPlaceholders, confirmNewPassword: 'Confirm your new password' }))}
                                                        />
                                                        <span
                                                            onClick={() => togglePassword('confirmNewPassword')}
                                                            className={`text-white bg-inf ${Style.icon}`}>
                                                            {showPassword.confirmNewPassword ?
                                                                <i className="fa-regular fa-eye"></i> :
                                                                <i className="fa-regular fa-eye-slash"></i>
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                {errors.confirmNewPassword && <p className='text-warning mt-1'>{(errors.confirmNewPassword as FieldError).message}</p>}

                                            </div>

                                            <div className='mt-3 pb-md-3'>
                                                <button className="btn btn-warning w-100 mt-4">Save</button>
                                            </div>
                                        </form>

                                    </div>

                                </Modal.Body>
                            </Modal>

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