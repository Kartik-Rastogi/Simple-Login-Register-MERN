import React from "react";
import   './homepage.css'

const Homepage = ({setLoginUser}) => {
   
   return(
      <div className="homepage">
            <h1>Welcome, {localStorage.getItem("username")}</h1>
            <h2>{localStorage.getItem("email")}</h2>
            <button className="button" onClick={() => setLoginUser({})}>Logout</button>
      </div>
   );
}


export default Homepage