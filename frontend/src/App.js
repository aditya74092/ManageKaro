import React, { useState } from 'react';
import axios from 'axios';
import Whiteboard from './Whiteboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // Import the new CSS file for styling

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://collabboard-backend.onrender.com'
});

// Function to set the token in the headers
const setAuthToken = token => {
    if (token) {
        api.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete api.defaults.headers.common['x-auth-token'];
    }
};

function App() {
    const [user, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAuth, setShowAuth] = useState(false);

    const register = async () => {
        setLoading(true);
        try {
            const res = await api.post('/auth/register', { user, password });
            console.log('User registered:', res.data);
            setMessage('User registered successfully!');
            setIsRegistering(false);
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Error registering user:', error.response ? error.response.data : error.message);
            setMessage('Error registering user.');
        } finally {
            setLoading(false);
        }
    };

    const login = async () => {
        setLoading(true);
        try {
            const res = await api.post('/auth/login', { user, password });
            console.log('User logged in:', res.data);
            localStorage.setItem('token', res.data.token); // Store the token in local storage
            setAuthToken(res.data.token); // Set the token in headers
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data : error.message);
            setMessage('Error logging in.');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthToken(null);
        setIsLoggedIn(false);
        setMessage('');
    };

    return (
        <div className="app-container">
            <ToastContainer containerId="mainToastContainer" />
            {!isLoggedIn ? (
                <div className="auth-container">
                    <button className="get-started-button" onClick={() => setShowAuth(true)}>Get Started</button>
                    {showAuth && (
                        <>
                            <h3>Welcome to Manage-Karo</h3>
                            {message && <p className="message">{message}</p>}
                            {loading && <div className="loading">Loading...</div>}
                            {isRegistering ? (
                                <div className="auth-form">
                                    <h2>Register</h2>
                                    <input type="text" placeholder="Username" value={user} onChange={(e) => setUsername(e.target.value)} />
                                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <button className="auth-button" onClick={register}>Register</button>
                                    <button className="secondary-button" onClick={() => { setIsRegistering(false); setMessage(''); }}>Back to Login</button>
                                </div>
                            ) : (
                                <div className="auth-form">
                                    <h4>Login</h4>
                                    <input type="text" placeholder="Username" value={user} onChange={(e) => setUsername(e.target.value)} />
                                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <button className="auth-button" onClick={login}>Login</button>
                                    <button className="secondary-button" onClick={() => { setIsRegistering(true); setMessage(''); }}>Register</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ) : (
                <Whiteboard onLogout={logout} />
            )}
        </div>
    );
}

export default App;
