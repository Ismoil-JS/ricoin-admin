import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import c from './User.module.scss';

const User = () => {
  const [userEmail, setUserEmail] = useState('');

  function loginUser(e) {
    e.preventDefault();

    // Define the headers with the Authorization header containing the token
    const headers = { 'x-auth-token': localStorage.getItem('token') };

    axios
      .post('https://api.ricoin.uz/api/users/admin', {
        email: userEmail,
      }, {
        headers, // Include headers in the request
      })
      .then((response) => 
      {
        if(response.status === 200) {
        alert("User is admin now!")
      }}
      )
      .catch((err) => {
        if(err.response.status === 401) {
          alert("You are not an admin")
        } 
        else if(err.response.status === 409) {
          alert("User not exists with this email!")
        }
        else {
          alert("Something went wrong!")
        }
      });
  }

  return (
    <div>
      <form onSubmit={loginUser} className={c.login__form}>
        <input required type="email" placeholder="Email..." onChange={(e) => setUserEmail(e.target.value)} />
        <button type="submit">Make admin</button>
      </form>
    </div>
  );
}

export default User;
