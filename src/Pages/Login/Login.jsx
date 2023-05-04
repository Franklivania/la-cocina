import React, { useState, useRef, useEffect } from 'react'
import '../SignUp/SignUp.scss'
import logo from '../../assets/logo-a.svg'
import login from '../../assets/login.svg'
import log from '../../assets/log.svg'
import deco from '../../assets/deco.svg'
import google from '../../assets/google-icon.svg'
import facebook from '../../assets/facebook-icon.svg'
import { Link } from 'react-router-dom'
import 'animate.css'

const Login = () => {
    const [formstate, setFormState] = useState({
        email: '',
        password: '',
    })
    
    const [currentLogIndex, setCurrentLogIndex] = useState(0);
    const bgImgRef = useRef();
    
    const logs = [
        {
            id: 1,
            image: login
        },
        {
            id: 2,
            image: log
        }
    ]

    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentLogIndex((currentIndex) => {
            const nextIndex = (currentIndex + 1) % logs.length;
            setTimeout(() => {
              bgImgRef.current.classList.remove('animate__fadeIn');
              bgImgRef.current.classList.add('animate__fadeOut');
              setTimeout(() => {
                bgImgRef.current.src = logs[nextIndex].image;
                bgImgRef.current.classList.remove('animate__fadeOut');
                bgImgRef.current.classList.add('animate__fadeIn');
              }, 500);
            }, []);
            return nextIndex;
          });
        }, 10000);
      
        return () => clearInterval(intervalId);
    }, [logs]);
      

    const [toggleVisibility, setToggleVisibility] = useState(false)

    const handleInputChange = e => {
        const {name, value} = e.target
        setFormState(prevState => ({ ...prevState, [name] : value}))
    }

    function handleClick(){
        setToggleVisibility(!toggleVisibility)
    }

  return (
    <div className='signup'>
        <Link to='/'><img src={logo} alt="" id='logo'/></Link>
        <div className="container">
            <img src={deco} alt="" id='one'/>
            <img src={deco} alt="" id='two'/>
        </div>

        <form action="">
                <h1>Welcome Back!</h1>

                <div className="socials">
                    <button type='button'>
                        <img src={google} alt="" />
                        Google
                    </button>
                    <button type='button'>
                        <img src={facebook} alt="" />
                        Facebook
                    </button>
                </div>

                <span>OR</span>

                <label htmlFor="">
                    <input type="email" name="email" id="email" placeholder='Your Email' value={formstate.email} onChange={handleInputChange}/>
                    <i class='fa-solid fa-envelope fa-2x'></i>
                </label>

                <label htmlFor="">
                    <input type={toggleVisibility ? 'text' : 'password'} name="password" id="password" placeholder='Your password' value={formstate.password} onChange={handleInputChange}/>
                    <i class='fa-solid fa-lock fa-2x'></i>
                    <button type='button' onClick={handleClick}>
                        <i class={`fa-solid fa-${ toggleVisibility ? 'eye' : 'eye-slash'}`}></i>
                    </button>
                </label>

                <input type="submit" value="Log In"  id='submit'/>

                <p>Don't have an account? <Link to='/signup' id='link'>Sign Up</Link></p>
            </form>

            <img
                src={logs[currentLogIndex].image}
                alt=''
                id='bg'
                ref={bgImgRef}
                className='animate__animated animate__fadeIn'
            />    
      </div>
  )
}

export default Login