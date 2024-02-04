// Register.js

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/style.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setErrorMessage('All fields must be filled');
            return;
        }

        console.log('Registration Request Data:', { name, email, password });

        try {
            const response = await axios.post('https://apitest.reachstar.io/signup', {
                name: name,
                email: email,
                password: password
            });

            if (response.data && response.data.success) {
                setErrorMessage('');
                setConfirmationMessage('Registration successful');

                console.log('Navigate:', navigate); // Check if navigate is defined

                // Navigate to /home without using './'
                navigate('/home');

            } else {
                console.error('Registration failed. Response:', response.data);
                setErrorMessage(response.data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div className="row d-flex justify-content-center align-items-center pt-4">
            <div className="col-md-6 p-4">
                <div className="card p-3 d-flex justify-content-center flex-column">
                    <h1 style={{ textAlign: 'center', color: 'green' }}>Registration</h1>
                    {!confirmationMessage && (
                        <Form className="custom-form" onSubmit={handleRegistration}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
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
                            <div className="d-flex justify-content-center pb-5 pt-2">
                                <button type="submit" className="btn-RegLog">Confirm Registration</button>
                            </div>
                        </Form>
                    )}
                    {confirmationMessage && (
                        <div className="alert alert-success">{confirmationMessage}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;

















