import React from "react";
import { useState } from "react";
import axios from "axios";
import c from "./User.module.scss";

const User = () => {
  const [userEmail, setUserEmail] = useState("");
  const [coinEmail, setCoinEmail] = useState("");
  const [coins, setCoins] = useState();

  function loginUser(e) {
    e.preventDefault();

    // Define the headers with the Authorization header containing the token
    const headers = { "x-auth-token": localStorage.getItem("token") };

    axios
      .post(
        "https://api.ricoin.uz/api/users/admin",
        {
          email: userEmail,
        },
        {
          headers, // Include headers in the request
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert("User is admin now!");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("You are not an admin");
          window.location.reload();
        } else if (err.response.status === 409) {
          alert("User not exists with this email!");
        } else {
          alert("Something went wrong!");
        }
      });
  }

  function giveCoins(e) {
    e.preventDefault();

    // Define the headers with the Authorization header containing the token
    const headers = { "x-auth-token": localStorage.getItem("token") };

    axios
      .patch(
        "https://api.ricoin.uz/api/users/coins",
        {
          email: coinEmail,
          coins: +coins,
        },
        {
          headers, // Include headers in the request
        }
      )
      .then((response) => {
        if (response.status === 204) {
          alert("User has coins now!");
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("You are not an admin");
        } else if (err.response.status === 409) {
          alert("User not exists with this email!");
        } else {
          alert("Something went wrong!");
        }
      });
  }

  return (
    <div>
      <form onSubmit={loginUser} className={c.login__form}>
        <input
          required
          type="email"
          placeholder="Email..."
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button type="submit">Make admin</button>
      </form>

      <form onSubmit={giveCoins} className={c.login__form}>
        <input
          required
          type="email"
          placeholder="Email..."
          onChange={(e) => setCoinEmail(e.target.value)}
        />
        <input
          required
          type="number"
          placeholder="Coin amount..."
          onChange={(e) => setCoins(e.target.value)}
        />
        <button type="submit">Give coins</button>
      </form>
    </div>
  );
};

export default User;
