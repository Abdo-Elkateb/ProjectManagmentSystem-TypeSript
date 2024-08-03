import axios from 'axios';
import React from 'react'
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import logo from "../../../../assets/images/PMS 3.png";
import Styles from "./VerifyAccount.module.css";
import StylesLogin from "../Login/Login.module.css";

type AuthInputs = {
  email: string;
  code: string;
};
export default function VerifyAccount() {
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputs>();
  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
    try {
      const response = await axios.put(
        "https://upskilling-egypt.com:3003/api/v1/Users/verify",
        data
      );
      console.log(response);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>

      <div className={`${Styles.authcontainer}  p-5 vh-100`}>
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-5 my-5 ">
              <div className="text-center">
                <img src={logo} className={`w-50 mb-3`} alt="" />
              </div>
              <div className={`${Styles.bgFormContainer} p-5 px-5 pt-5`}>
                 <div className={`mb-5`}>
                    <p className={`${StylesLogin.contentP}`}>Welcome to PMS</p>
                    <h4 className={`${StylesLogin.contentHeader}`}>Verify Account</h4>
                  </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="col md-6">
                    <label className={`${Styles.textGold}`}>E-mail</label>
                    <div>
                      <input
                        type="text"
                        className={`${Styles.input} p-1 text-white w-100`}
                        placeholder="Enter your email"
                           {...register("email", {
                            required: "*Email is required",
                            pattern: {
                              value: /^[^@]+@[^@]+\.[^@.]{2,}$/,
                              message: "Invaild mail",
                            },
                          })}
                      />
                    </div>
                    {errors.email && (
                      <p className="alert alert-danger mt-2">
                        {(errors.email as FieldError).message}
                      </p>
                    )}
                  </div>
                  <div className="col md-6">
                    <label className={`${Styles.textGold}`}>OTP Verification</label>
                    <div>
                      <input
                        type="text"
                        className={`${Styles.input} p-1 text-white w-100`}
                        placeholder="Enter Verification"
                        {...register("code", {
                          required: "code is required",
                        })}
                      />
                    </div>
                    {errors.code && (
                      <p className="alert alert-danger mt-2">
                        {(errors.code as FieldError).message}
                      </p>
                    )}
                  </div>
                  <div className="text-center">
                    <button className={`btn ${Styles.btnGold} px-5 w-100 my-3`}>
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}