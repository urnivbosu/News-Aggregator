import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../credentials.css";
// import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/v1/user/login', formData);
            console.log(response);
            // Handle the response as needed (e.g., redirect, show a success message)
            console.log('Login successful:', response.data);
            navigate('/news')
        } catch (error) {
            // Handle the error (e.g., show an error message)
            console.error('Login failed:', error.message);
        }
    };

    return (
        <div className="container">
            <h2 className="head">Hey Welcome!! Login to get fastest news at your tips</h2>
            <div className="container-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder='Enter the Username'
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder='Enter Password'
                    />
                </div>
                <button type="submit" className='b11'>Submit</button>
            </form>
            </div>
            <p>
                Create an Account <Link to="/">SignUp here</Link>.
            </p>
        </div>
    );
};

export default Login;
