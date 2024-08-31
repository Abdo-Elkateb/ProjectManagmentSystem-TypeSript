import styles from "../../../AuthenticationModule/";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import logo from "../../../../assets/images/PMS 3.png";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import { useToast } from "../../../Context/ToastContext";
import AnimatedPage from "../../../AnimatedPage/AnimatedPage";
import Transition from "../../../Tramsition/Transition";


export default function ChangePasswordFromDashborad() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getUserData } = useAuth();
  const timeoutRef = useRef<number>();

  const { getToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputs>();

  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://upskilling-egypt.com:3003/api/v1/Users/Login`,
        data
      );
      localStorage.setItem("token", res.data.token);
      getUserData();
      timeoutRef.current = setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
      setLoading(false);
      getToast("success", "Logged in Successfuly");
    } catch (err: any) {
      setLoading(false);
      getToast("error", err.response.data.message);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (

    <div className={styles.authContainer}>
      <div className={`container-fluid`}>
        <div
          className={`row vh-100 justify-content-center align-items-center overflow-hidden`}
        >
          <div className={`col-lg-6 col-md-8 col-sm-8 bg-inf`}>
            <div className={styles.login}>
              <div className={`text-center pb-2`}>
                <img src={logo} className={`w-50 mb-3`} alt="" />
              </div>
              <AnimatedPage>
                <div className={`${styles.content} p-5`}>
                  <div className={`mb-5`}>
                    <p>Welcome to PMS</p>
                    <h4>Login</h4>
                  </div>
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
              </AnimatedPage>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}