
import styles from "./ChPsDashbrad.module.css";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
// import logo from "../../../../assets/images/PMS 3.png";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useAuth } from "../../../Context/AuthContext";
// import { useToast } from "../../../Context/ToastContext";
import AnimatedPage from "../../../AnimatedPage/AnimatedPage";


export default function ChPassDashbrad() {
  return (
       <div className={styles.authContainer}>
      <div className={`container-fluid`}>
        <div
          className={`row vh-100 justify-content-center align-items-center overflow-hidden`}
        >
          <div className={`col-lg-6 col-md-8 col-sm-8 bg-inf`}>
    
          </div>
        </div>
      </div>
    </div>
  )
}
