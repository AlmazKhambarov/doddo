/** @format */

import React, { useState } from "react";
import logo from "../Logo-Instagram-1-768x432.png";
import bg from "./Image 31-10-2023 at 14.39.jpg";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "./redux/extraReducer";

const Home = () => {
  var dipatch = useDispatch();
  // thisssss
  const { error } = useSelector((state) => state.base);
  const navigate = useNavigate();

  const [data, setData] = useState({
    // thisssss
    email: "",
    password: "",
    // thisssss
  });
  const handleLogin = (e) => {
    e.preventDefault();
    // thisssss
    dipatch(UserLogin(data));
    navigate("/");
  };
  return (
    <div className='home'>
      <div className='container'>
        <div className='box'>
          <div className='img-box'>
            <img className='img' src={bg} />
          </div>
          <div className='card'>
            <div className='card-box'>
              <div className='logo'>
                <img className='logo-img' src={logo} />
              </div>
              <form className='form' onSubmit={handleLogin}>
                <div className='form-card'>
                  <div className='form-box'>
                    <input
                      className='form-input'
                      type='text'
                      id=''
                      name=''
                      placeholder='Phone number, username or email address'
                      required
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className='form-box'>
                    <input
                      className='form-input'
                      type='password'
                      id=''
                      name=''
                      placeholder='Password'
                      required
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <button className='btn' type='submit'>
                  Log in
                </button>
              </form>

              <div className='forget'>
                <a href=''>
                  <h1>Forgetten your password?</h1>
                </a>
              </div>
            </div>
            <div className='signup-box'>
              <h1>
                Don't have an account?{" "}
                <a href='/sign-up'>
                  <span className='text-blue-500 font-bold'>Sign Up</span>
                </a>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
