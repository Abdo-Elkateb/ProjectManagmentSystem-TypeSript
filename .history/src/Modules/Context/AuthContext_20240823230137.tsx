import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { AuthInterface } from "../../Interfaces/Interface";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Context/ToastContext";
import { useForm } from "react-hook-form";
import Style from '../SharedModule/components/SideBar/sidebar.module.css'
import axios from "axios";

export const AuthContext = createContext<AuthInterface>({
  baseUrl: "",
  getUserData() { },
  ChangePassword() { },
  logout() { },
  loginUser: {
    exp: 0,
    iat: 0,
    roles: ["", "", "", "", "", "", ""],
    userName: "",
    userEmail: "",
    userGroup: "",
    userId: 0,
  },
  requestHeaders: {},
  setLoginUser() { },
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthContextProvider(props: PropsWithChildren) {
  const [loginUser, setLoginUser] = useState(null);
  function logout() {
    localStorage.removeItem("token");
    setLoginUser(null);
  }


  let requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  let baseUrl = "https://upskilling-egypt.com:3003/api/v1";

  const getUserData = () => {
    const encodedToken: any = localStorage.getItem("token");
    const decodedToken: any = jwtDecode(encodedToken);
    setLoginUser(decodedToken);
  };


  const ChangePassword = () => {
    const { getToast } = useToast();


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
        console.log(data);

      }
      catch (error) {

        console.log(error);
      }
    }
    return (


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
    )
  }


  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    }

  }, []);

  return (
    <AuthContext.Provider
      value={{ getUserData, loginUser, setLoginUser, baseUrl, requestHeaders, ChangePassword, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
