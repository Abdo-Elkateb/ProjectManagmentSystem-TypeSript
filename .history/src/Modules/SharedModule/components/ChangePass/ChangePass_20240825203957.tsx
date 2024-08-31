import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';



import { useForm } from 'react-hook-form';
// import Style from './sidebar.module.css'
import axios from 'axios';

import { FieldError } from 'react-hook-form';
import { useToast } from "../../../Context/ToastContext";



export default function ChangePass() {

  const { setLoginUser, baseUrl, requestHeaders } = useAuth();
  let { register, handleSubmit, formState: { errors }, watch } = useForm();
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


  // *========================================><=============================================//
  return (

    <>

      </div>

    </>
  )
}
