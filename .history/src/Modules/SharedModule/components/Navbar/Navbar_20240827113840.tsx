import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import navLogo from "../../../../assets/images/nav-logo.png";
import navImg from "../../../../assets/images/8550fbcbe60cd242d12760784feff287.jpeg";
import navStyle from "./Navbar.module.css";
import { useAuth } from '../../../Context/AuthContext';
import styles from "../MasterLayout/MasterLayout.module.css"
import DarkModeToggle from "react-dark-mode-toggle";
import { useState, useEffect } from "react";
import DarkMood from '../../../DarkMood/DarkMood';
import SideBar from '../SideBar/SideBar';
import SideBarStyle from '../SideBar/sidebar.module.css';
import SideBarMobile from '../SideBar/SideBarMobile';
import { Link } from 'react-router-dom';
export default function CustomNavbar() {
  let [collapsedWidth, setCollapsedWidth] = useState("0px");

  const updateCollapsedWidth = () => {
    const width = window.innerWidth;
    if (width <= 576) {
      setCollapsedWidth("100%");
    } else if (width <= 768) {
      setCollapsedWidth("80px");

    }
  };

  useEffect(() => {
    updateCollapsedWidth();
    window.addEventListener('resize', updateCollapsedWidth);
    return () => window.removeEventListener('resize', updateCollapsedWidth);
  }, []);

  const { loginUser, ChangePassword } = useAuth();

  return (
    <>
      <Navbar expand="md" className={`${styles.nav} p-1 shadow-sm navber-darkmood`}>
        <Container>
          <Navbar.Brand className=''>
            <img src={navLogo} className='w-na bg-dange mr-4' alt="" />
          </Navbar.Brand>
          <div className={SideBarStyle.sidebarMobile}>
            <nav className="navbar bg-body-tertiary fixed-top">
              <div className="container-fluid">
                <SideBarMobile />
                <Navbar.Brand>
                  <img src={navLogo} className='w-na bg-dange' alt="" />
                </Navbar.Brand>
                <DarkMood />


              </div>
            </nav>
          </div>

          <Navbar.Collapse id="basic-navbar-nav" className='bg-dange'>
            <Nav className="text-center ms-md-auto d-flex gap-md-4 bg-blac py-3 py-md-0">
              <Navbar.Brand>
                <DarkMood />
              </Navbar.Brand>
              <Nav.Link className='d-none d-md-flex d-flex align-items-center justify-content-center justify-content-lg-start p-3 p-md-0 mb-3 mb-md-0 me-md- rounded-4'>

                <i className={`fa-solid fa-bell ${navStyle.mainColor}`}></i>

              </Nav.Link>

              <div className="line border border-1"></div>

              <Nav.Link className='p-3 p-md-0 d-flex  rounded-4 justify-content-center align-items-center gap-4 gap-md-3'>

                <div className='d-md-none'>
                  <i className={`fa-solid fa-bell ${navStyle.mainColor}`}></i>
                </div>

                <div className={`overflow-hidden rounded-circle ${navStyle.navImg}`}>
                  <img src={navImg} className='w-100' alt="" />
                </div>

                <div >

                  <p className={`${navStyle.fs} text-start text-black fw-semibold  dark-p`}>{loginUser?.userName}</p>
                  <p className={`${navStyle.fs} text-muted fst-italic  dark-p`}>{loginUser?.userEmail}</p>

                </div>

                <div>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </Nav.Link>


            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  )
}
