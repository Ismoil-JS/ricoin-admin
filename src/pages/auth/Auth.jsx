import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import c from "./Auth.module.scss"

const Auth = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();


  function loginUser(e){
    e.preventDefault();
    axios.post("https://api.ricoin.uz/api/users/sign-in", {
      email: userEmail,
      password:userPassword
    })
    .then(response => 
      {
        if(response.data.role === "admin"){
        localStorage.setItem("token", response.data.token)
        navigate("/dashboard")}
        else{
          alert("You are not an admin")
        }
      }
    )
    .catch()
  }

  return (
    <div>
      <form onSubmit={loginUser} className={c.login__form}>
        <input required type="email"  placeholder="Your Email..." onChange={(e) => setUserEmail(e.target.value)}/>
        <input required type="password"  placeholder="Your Password..." onChange={(e) => setUserPassword(e.target.value)}/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Auth;
