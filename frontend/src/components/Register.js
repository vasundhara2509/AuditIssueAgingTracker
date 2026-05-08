import React, { useState } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: '',
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

      await axios.post(

        'https://auditissueagingtracker-1.onrender.com/api/auth/register',

        formData

      );

      alert('Registration Successful');

      navigate('/login');

    } catch (error) {

      alert('User already exists');

    }

  };

  return (

    <div className="form-container">

      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;