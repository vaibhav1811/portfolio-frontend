import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './Admin.css';

const Login = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('adminToken', 'admin-token');
                localStorage.setItem('adminPassword', password);
                toast.success('Welcome back, Admin!');
                navigate('/admin/dashboard');
            } else {
                toast.error('Invalid password');
            }
        } catch (err) {
            toast.error('Server connection failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin__login section">
            <div className="container">
                <div className="login__box">
                    <h2 className="section__title">Admin Login_</h2>
                    <form onSubmit={handleLogin} className="login__form">
                        <div className="form__group">
                            <input
                                type="password"
                                className="form__input"
                                placeholder=" "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label className="form__label">Access Password</label>
                        </div>
                        <button className="button" disabled={loading}>
                            {loading ? 'Authenticating...' : 'Enter Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
