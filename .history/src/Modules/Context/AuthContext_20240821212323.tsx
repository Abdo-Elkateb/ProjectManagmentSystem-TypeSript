import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { AuthInterface } from "../../Interfaces/Interface";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Context/ToastContext";

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
{

}
export default function AuthContextProvider(props: PropsWithChildren) {
    const [loginUser, setLoginUser] = useState(null);
    // const navigate = useNavigate();
    

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
    return (

      alert("ChangePassword")
    )
  }


  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
      logout()
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
