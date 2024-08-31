import React, { useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import Styles from "./sidebar.module.css"
import { useToast } from "../../../Context/ToastContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';




export default function SideBarMobile() {

    const { logout } = useAuth();

    const { getToast } = useToast();

    const timeoutRef = useRef<number>();

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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


                                <NavLink style={navLinkStyles} className={Styles.liSidebar} to="changePassword">
                                    <i className="fa-solid fa-lock iconssidebar"></i>
                                    Change Password</NavLink>
                            </li>
                            <Button variant="primary" onClick={handleShow}>
                                Launch demo modal
                            </Button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                <inpout
                                                placeholder="name@example.com"
                                              
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                        >
                                            <Form.Label>Example textarea</Form.Label>
                                            <Form.Control as="textarea" rows={3} />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleClose}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
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
