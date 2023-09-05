import React, { useState, useContext } from "react";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { UserContext } from "./UserContext";

// Import your SVG icons from the public directory
import usernameIcon from "../images/user.svg";
import passwordIcon from "../images/lock.svg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const { setUser } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize navigate from react-router-dom

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/home");
    // axios
    //   .post("localhost:5000", {
    //     username: username, // Pass username and password as an object
    //     password: password,
    //   })
    //   .then((res) => {
    //     // console.log(res.data);
    //     if (res.data.success) {
    //       // store the session token in the local storage
    //       sessionStorage.setItem("sessionToken", res.data.sessionToken);
    //       sessionStorage.setItem("type_id", res.data.type_id);
    //       // setUser(res.data.sessionToken);

    //       navigate("/dashboard", { state: { show: true, onHide: true } });
    //     } else {
    //       alert("Incorrect Username or Password");

    //       setError(res.data.Error);
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">
                <img src={usernameIcon} alt="Username" className="icon" />
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                required
                placeholder="Username or Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                <img src={passwordIcon} alt="Password" className="icon" />
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <button type="login">Login</button>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>
          </form>
          <div className="register">
            <p>Don't have an account?</p>
            <NavLink to="/HospitalDetails" className="blue-link">
              Register
            </NavLink>
          </div>
        </div>
      </div>
      <div className="login-right">
        <img
          src="https://generation-sessions.s3.amazonaws.com/7a638f4fceb35cc27f49d184e82aedce/img/19836-1.png"
          alt="Login"
          width="300"
          height="300"
        />
      </div>
    </div>
  );
}

export default Login;
