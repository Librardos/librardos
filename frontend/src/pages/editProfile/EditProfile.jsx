import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar'
import { Footer } from '../../components/Footer/Footer'
import Moment from 'react-moment'
import { AuthContext } from '../../context/AuthContext';
import './editProfile.css';

export const EditProfile = () => {
  const {user} = useContext(AuthContext);
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: user.email,
    user_password: "",
  });

  const [userInfo, setUserInfo] = useState({
    photo_url: user.photo_url,
    address: user.address,
    birth_date: user.birth_date,
    username: user.username,
  })

  const handleUserChange = (e) => {
    setUserInfo((prev) => ({...prev, [e.target.id]: e.target.value}))
  }
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/auth/auth/" + user._id, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate('/profile')
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/auth/user/" + user._id, userInfo);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate('/profile')
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <>
      <Navbar/>
      <h1>Usuario</h1>
      <div className="card medicine-wrapper">
      <form  className="form-control" onSubmit={handleSubmit}>
        
        <input
          type="text"
          placeholder="email"
          id="email"
          value={credentials.email}
          onChange={handleChange}
          className="form-control"
        />
        <input
          type="password"
          placeholder="password"
          id="user_password"
          value={credentials.user_password}
          onChange={handleChange}
          className="form-control"
        />
        <button className="btn btn-secondary">
          Confirmar
        </button>
        </form>
        <form  className="form-control" onSubmit={handleUserSubmit}>
        <input
          type="text"
          placeholder="username"
          id="username"
          value={userInfo.username}
          onChange={handleUserChange}
          className="form-control"
        />
        <input
          type="text"
          placeholder="address"
          id="address"
          value={userInfo.address}
          onChange={handleUserChange}
          className="form-control"
        />
        <input
          type="date"
          placeholder="birth_date"
          id="birth_date"
          value={credentials.birth_date}
          onChange={handleUserChange}
          className="form-control"
        />
        <input
          type="text"
          placeholder="url de imagen"
          id="photo_url"
          value={userInfo.photo_url}
          onChange={handleUserChange}
          className="form-control"
        />
        <button className="btn btn-secondary">
          Confirmar
        </button>
        </form>
      </div>
    </>
  )
}