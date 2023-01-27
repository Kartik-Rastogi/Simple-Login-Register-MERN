import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import './login.css'

const Login = ({ setLoginUser }) => {

   const navigate = useNavigate();

   const [user, setUser] = useState({
      email: "",
      password: ""
   })

   const handleChange = e => {
      const { name, value } = e.target
      setUser({
         ...user,
         [name]: value
      })
   }

   const login = () => {
      axios.post("http://localhost:9002/login", user)
         .then(res => {
            alert(res.data.message)
            setLoginUser(res.data.user)
            localStorage.setItem("username",res.data.user.name)
            localStorage.setItem("email",res.data.user.email)
            navigate("/")
         })
   }

   return (
      <div className="login">
         {/* {console.log("User", user)} */}
         <h1>Login</h1>
         <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
         <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password(8 Inputs Only)" ></input>
         <div className="button" onClick={login}>Login</div>
         <div>or</div>
         <div className="button" onClick={() => navigate("/register")}>Register</div>
      </div>
   )
}

export default Login