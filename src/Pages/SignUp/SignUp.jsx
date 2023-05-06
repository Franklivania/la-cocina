import React, { useState } from "react";
import "./SignUp.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/Logoa.svg";
import signup from "../../assets/signup.svg";
import deco from "../../assets/deco.svg";
import google from "../../assets/google-icon.svg";
import facebook from "../../assets/facebook-icon.svg";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formstate, setFormState] = useState({
    email: "",
    password: "",
  });

  const [toggleVisibility, setToggleVisibility] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const checkPassword = () => {
    let info = [];
    const password = formstate.password;
    if (password.length < 8) {
      info.push("Password must be more than 8 characters long");
    }
    if (!password.match(/[A-Z]/)) {
      info.push("Password must contain a capital letter");
    }
    if (!password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
      info.push("Password must contain a special character");
    }
    if (!password.match(/[0-9]/)) {
      info.push("Password must contain a number");
    }
    return info;
  };

  const info = checkPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formstate),
    };

    try {
      const response = await fetch(
        "https://lacocina-api.onrender.com/api/v1/signup",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Success
        toast.success("You have signed up successfully!");
      } else if (response.status === 409) {
        // Email already used
        toast.error("The email is already used. Please use a different one.");
      } else if (response.status === 400) {
        // Invalid input
        toast.error("This email already exists, use another one");
      } else {
        // Other errors
        toast.error("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleClick() {
    setToggleVisibility(!toggleVisibility);
  }

  return (
    <div className="signup">
      <Link to="/">
        <img src={logo} alt="" id="logo" />
      </Link>
      <div className="container">
        <img src={deco} alt="" id="one" />
        <img src={deco} alt="" id="two" />
      </div>

      <form onSubmit={handleSubmit}>
        <h1>Create an account</h1>

        <div className="socials">
          <button type="button">
            <img src={google} alt="" />
            Google
          </button>
          <button type="button">
            <img src={facebook} alt="" />
            Facebook
          </button>
        </div>

        <span>OR</span>

        <label htmlFor="">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            value={formstate.email}
            onChange={handleInputChange}
          />
          <i className="fa-solid fa-envelope fa-2x"></i>
        </label>

        <label htmlFor="">
          <input
            type={toggleVisibility ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Your password"
            value={formstate.password}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {isFocused && info.length > 0 && (
            <div className="password-info">
              {info.map((i) => (
                <div key={i}>{i}</div>
              ))}
            </div>
          )}
          <i className="fa-solid fa-lock fa-2x"></i>
          <button type="button" onClick={handleClick}>
            <i className={`fa-solid fa-${toggleVisibility ? "eye" : "eye-slash"}`}></i>
          </button>
        </label>

        <input type="submit" value="SignUp" id="submit" />

        <p>
          Already Have an account?{" "}
          <Link to="/login" id="link">
            Sign In
          </Link>
        </p>
      </form>

      <img src={signup} alt="" id="bg" />
    </div>
  );
};

export default SignUp;
