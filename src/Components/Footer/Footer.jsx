import {React, useState } from "react";
import "./Footer.scss";
import 'axios'
import logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {

    const [email, setEmail] = useState(" ")
    console.log(email)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email)
    
        try {
          const response = await fetch(
            `https://lacocina-api.onrender.com/api/v1/email-subscription/${email}`,
            {method: "POST"}
          );
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <footer>
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <section>
        <aside>
          <label htmlFor="">
            <p>Subscribe to our newsletter`</p>
            <input type="email" name="email" id="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
            <input type="submit" value="Subscribe" id="submit" onClick={handleSubmit} />
          </label>

          <div className="socials">
            <a href="">
              <i className="fa-brands fa-facebook fa-2x"></i>
            </a>
            <a href="">
              <i className="fa-brands fa-instagram fa-2x"></i>
            </a>
            <a href="">
              <i className="fa-brands fa-youtube fa-2x"></i>
            </a>
            <a href="">
              <i className="fa-brands fa-twitter fa-2x"></i>
            </a>
            <a href="">
              <i className="fa-brands fa-tiktok fa-2x"></i>
            </a>
          </div>
        </aside>
        <menu>
          <nav>
            <Link to="/" className="link">
              About
            </Link>
            <Link to="/" className="link">
              Contact Us
            </Link>
          </nav>
          <nav>
            <Link to="/" className="link">
              Blogs
            </Link>
            <Link to="/" className="link">
              Categories
            </Link>
            <Link to="/" className="link">
              Terms of Use
            </Link>
          </nav>
          <nav>
            <Link to="/" className="link">
              Disclaimer
            </Link>
            <Link to="/" className="link">
              Privacy Policy
            </Link>
          </nav>
        </menu>
      </section>
    </footer>
  );
};

export default Footer;
