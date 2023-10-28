import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import c from './User.module.scss';

const User = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  function loginUser(e) {
    e.preventDefault();

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Define the headers with the Authorization header containing the token
    const headers = {
      Authorization: `${token}`,
    };

    axios
      .post('http://localhost:9000/api/users/admin', {
        name: name,
        surname: surname,
        email: userEmail,
        password: userPassword,
      }, {
        headers, // Include headers in the request
      })
      .then((response) => 
      {if(response.status === 201) {
        alert("User created")
      }}
      )
      .catch((err) => {
        if(err.response.status === 401) {
          alert("You are not an admin")
        } 
        else if(err.response.status === 409) {
          alert("User already exists with this email!")
        }
      });
  }

  return (
    <div>
      <form onSubmit={loginUser} className={c.login__form}>
        <input required type="text" placeholder="Your Name..." onChange={(e) => setName(e.target.value)} />
        <input required type="text" placeholder="Your Surname..." onChange={(e) => setSurname(e.target.value)} />
        <input required type="email" placeholder="Your Email..." onChange={(e) => setUserEmail(e.target.value)} />
        <input required type="password" placeholder="Your Password..." onChange={(e) => setUserPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default User;
