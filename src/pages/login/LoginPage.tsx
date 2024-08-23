import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import authStore from "../../stores/AuthStore.ts";

const LoginPage = observer(() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await authStore.login(email, password);

        if (!authStore.authError) {
            navigate('/home'); // Preusmjeri na HomePage nakon uspješne prijave
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {authStore.authError && <p style={{color: 'red'}}>{authStore.authError}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={authStore.loading}>
                    {authStore.loading ? 'Loading...' : 'Login'}
                </button>
                <div>horizontalna crta koju cemo dodati kad dode tailwind</div>
                <div> ovdje ce biti box sa google sign in i mozda jos neki servis</div>
            </form>
        </div>
    );
});

export default LoginPage;
