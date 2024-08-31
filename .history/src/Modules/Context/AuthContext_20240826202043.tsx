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
