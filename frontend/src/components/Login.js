import React, { useState } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: '',
    password: ''

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        'https://auditissueagingtracker-1.onrender.com/api/auth/login',

        formData

      );

      localStorage.setItem(
        'userInfo',
        JSON.stringify(response.data)
      );

      alert('Login Successful');

      navigate('/');

    } catch (error) {

      alert('Invalid Credentials');

    }

  };

  return (

    <div className="form-container">

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;