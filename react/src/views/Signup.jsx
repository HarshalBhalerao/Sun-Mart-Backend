import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const {setUser, setToken} = useStateContext()

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setToken(data.token)
        setUser(data.user)
      })
      .catch(err => {
        const response= err.response;
        if(response && response.status === 422){
          //Validation Error
          console.log(response.data.errors);
        }
      })
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for free</h1>
          <input ref={nameRef} placeholder="Full Name" />
          <input ref={emailRef} placeholder="Email Address" type="email" />
          <input ref={passwordRef} placeholder="Password" type="password" />
          <input
            ref={passwordConfirmationRef}
            placeholder="Password Confirmation"
            type="password"
          />
          <button className="btn btn-block">Sign up</button>
          <p className="message">
            Already Registered ? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
