
// import styles from "./ChPsDashbrad.module";
// import styles from "../Dashboard/Dashboard.module";
// import { FieldError, SubmitHandler, useForm } from "react-hook-form";
// import logo from "../../../../assets/images/PMS 3.png";
// import React, { useEffect, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// // import { useAuth } from "../../../Context/AuthContext";
// // import { useToast } from "../../../Context/ToastContext";
// import AnimatedPage from "../../../AnimatedPage/AnimatedPage";


export default function ChPassDashbrad() {
  return (

    <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

  )
}
