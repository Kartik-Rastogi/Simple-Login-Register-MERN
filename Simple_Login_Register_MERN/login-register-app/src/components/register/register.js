import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  axios from "axios";
import './register.css'

const Register = () => {

   const navigate = useNavigate();

   const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      reEnterPassword: ""
   })

   const handleChange = e => {
      const { name, value } = e.target
      setUser({
         ...user,
         [name]: value
      })
   }

   const register = () => {
      const { name, email, password, reEnterPassword } = user
      if (name && email && password && (password === reEnterPassword) && (password.length  && reEnterPassword.length)===8) {
         axios.post("http://localhost:9002/register", user)
            .then(res => {
               alert(res.data.message)
               navigate("/login")
            })
      } else {
         alert("Invalid Input")
      }

   }

   return (
      <div className="register">
         {/*console.log("User", user)*/}
         <h1>Register</h1>
         <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input>
         <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
         <input type="password" name="password" value={user.password} placeholder="Your Password(8 Inputs Only)" onChange={handleChange}></input>
         <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password(8 Inputs Only)" onChange={handleChange}></input>
         <div className="button" onClick={register}>Register</div>
         <div>or</div>
         <div className="button" onClick={() => navigate("/login", { replace: true })}>Login</div>
      </div>
   )
}

export default Register