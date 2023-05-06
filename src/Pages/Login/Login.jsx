import React, { useState, useRef, useEffect } from "react";
import "../SignUp/SignUp.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/Logoa.svg";
import login from "../../assets/login.svg";
import log from "../../assets/log.svg";
import deco from "../../assets/deco.svg";
import google from "../../assets/google-icon.svg";
import facebook from "../../assets/facebook-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import "animate.css";

const Login = () => {
  const [formstate, setFormState] = useState({
    email: "",
    password: "",
  });

  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const bgImgRef = useRef();
  const navigate = useNavigate()

  const logs = [
    {
      id: 1,
      image: login,
    },
    {
      id: 2,
      image: log,
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLogIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % logs.length;
        setTimeout(() => {
          bgImgRef.current.classList.remove("animate__fadeIn");
          bgImgRef.current.classList.add("animate__fadeOut");
          setTimeout(() => {
            bgImgRef.current.src = logs[nextIndex].image;
            bgImgRef.current.classList.remove("animate__fadeOut");
            bgImgRef.current.classList.add("animate__fadeIn");
          }, 500);
        }, []);
        return nextIndex;
      });
    }, 20000);

    return () => clearInterval(intervalId);
  }, [logs]);

  const [toggleVisibility, setToggleVisibility] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://lacocina-api.onrender.com/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formstate),
    })
      .then((response) => {
        if (response.ok) {
          // The login was successful
          toast.success("Login successful");
        } else if (response.status === 400) {
          // Invalid email or password
          toast.error("Invalid email or password");
        } else if (response.status === 401) {
          // Password doesn't match the email
          toast.error("Password doesn't match the email");
        } else {
          // The login failed for some other reason
          toast.error("Login failed");
        }
        navigate('/recipes')
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        toast.error("Error logging in");
      });
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
        <h1>Welcome Back!</h1>

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
          />
          <i className="fa-solid fa-lock fa-2x"></i>
          <button type="button" onClick={handleClick}>
            <i className={`fa-solid fa-${toggleVisibility ? "eye" : "eye-slash"}`}></i>
          </button>
        </label>

        <input type="submit" value="Log In" id="submit" />

        <p>
          Don't have an account?{" "}
          <Link to="/signup" id="link">
            Sign Up
          </Link>
        </p>
      </form>

      <img
        src={logs[currentLogIndex].image}
        alt=""
        id="bg"
        ref={bgImgRef}
        className="animate__animated animate__fadeIn"
      />
    </div>
  );
};

export default Login;
