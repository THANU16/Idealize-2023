import React, { useState } from "react";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

// Import your SVG icons from the public directory
import usernameIcon from "../../images/user.svg";
import passwordIcon from "../../images/lock.svg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your login logic here, e.g., sending a request to a server.
    // console.log(`Username/Email: ${username}, Password: ${password}`);
    const data = { email: username, password: password };
    axios
      .post("http://localhost:8000/login", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.isExist) {
          if (res.data.sucess) {
            const sessionToken = res.data.sessionToken;
            const typeID = res.data.typeID;
            sessionStorage.setItem(
              "sessionToken",
              JSON.stringify(sessionToken)
            );
            sessionStorage.setItem("typeID", JSON.stringify(typeID));
            navigate("/home");
          } else {
            alert("please check your email and password");
          }
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
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
              <button type="submit">Login</button>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>
          </form>
          <div className="register">
            <p>Don't have an account?</p>
            <NavLink to="/signup" className="blue-link">
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
