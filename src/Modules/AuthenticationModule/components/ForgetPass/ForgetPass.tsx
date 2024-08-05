import React, { useState } from 'react'
import logo from '../../../../Modules/../assets/images/PMS 3.svg'
import { useForm,SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import stylesLogin from "../Login/Login.module.css";
import  styles from './ForgetPass.module.css'
import AnimatedPage from '../../../AnimatedPage/AnimatedPage';

type AuthInputs = {
  email: string;
  code : string;
};
export default function ForgetPass() {
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputs>();

  const onSubmit : SubmitHandler<AuthInputs> = async(data) => {
    console.log(data)
       setLoading(true);
    try {
      const res = await axios.post('https://upskilling-egypt.com:3003/api/v1/Users/Reset/Request', data)
      console.log(res)
        setLoading(false);
      toast.success('Your request is being processed, please check your email')
      navigate('/resetpass')
    }
    catch (error:any) {
      toast.error(error.response.data.message)
         setLoading(false);
    }

  }
  return (

    

    <div className='auth-container'>
      <div className='container-fluid'>
        <div className="row d-flex vh-100 justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="forgot text-center mb-4">
            <img src={logo} className={`w-50 mb-3`} alt="" />
            </div>
            <AnimatedPage>
         <form action="#" onSubmit={handleSubmit(onSubmit)} className='form-auth' style={{ padding: "80px 60px" }}>
              <h1 className='auth-title'>Forget Password</h1>
              <span className='e-mail'>E-mail</span> <br />
              <div className='auth-standard-basic'>
                <input className='input' placeholder='Enter your E-mail'
                  type="text"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invlid mail"
                    }
                  })}
                />
              </div>
              {errors.email && (
                <p className="alert alert-danger">{errors.email.message} </p>
              )}

              <div className='text-center mt-5'>
                       <button
                      disabled={loading}
                      className={`btn ${stylesLogin.btn_main}`}
                       >
                      {loading ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        "Verify"
                      )}
                    </button>
              </div>
            </form>
            </AnimatedPage>

   
          </div>
        </div>
      </div>
    </div>
  )
}