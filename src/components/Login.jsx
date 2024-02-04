// Login.jsx

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/style.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Check if email or password is empty
        if (!email || !password) {
            setErrorMessage('All fields must be filled in');
            return;
        }

        try {
            // Make API request for login
            const response = await axios.post('https://apitest.reachstar.io/signin', {
                email: email,
                password: password
            });

            // Check if the response indicates successful login
            if (response.data.success) {
                setConfirmationMessage('Your entered data is correct');
                setEmail('');
                setPassword('');
                setErrorMessage('');

                // Save the user token to localStorage
                localStorage.setItem('userToken', response.data.token);

                setTimeout(() => {
                    navigate('/Home');
                }, 1000);
            } else {
                // Handle case where login was not successful (unregistered data)
                setErrorMessage("The data you entered is incorrect. If you are not a registered user, please register.");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Unauthorized (401) indicates incorrect credentials
                setErrorMessage("The data you entered is incorrect. If you are not a registered user, please register.");
            } else {
                setErrorMessage('Login failed. Please try again or register');
            }
        }
    };

    return (
        <div className="row d-flex justify-content-center align-items-center pt-4">
            <div className="col-md-6">
                <div className="d-flex justify-content-end gap-2 flex-row pb-2">
                    <p style={{ color: '#c62641', paddingTop: '8px' }}>New here?</p>
                    <Link to="/register" className="btn btn-green">Register</Link>
                </div>

                <div className="card p-4 pt-3 d-flex justify-content-center flex-column">
                    <h2 style={{ textAlign: 'center' }}>Login</h2>
                    <Form className="custom-form" onSubmit={handleLogin}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ paddingTop: '20px' }}>Password</Form.Label>
                            <div className="password-input position-relative">
                                <Form.Control
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div
                                    className="show-hide-password position-absolute top-0 d-flex justify-content-center start-100"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </div>
                            </div>
                        </Form.Group>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        {confirmationMessage && (
                            <div className="alert alert-success">{confirmationMessage}</div>
                        )}
                        <div className="d-flex justify-content-center pb-5 pt-2">
                            <button type="submit" className="btn-RegLog">Login</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;











