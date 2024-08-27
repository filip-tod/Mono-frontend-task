import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import authStore from "../../stores/AuthStore.ts";
import GoogleIcon from '../../assets/icons/google/icons8-google.svg';
import ServiceButton from "../../components/ServiceButton.tsx";

const LoginPage = observer(() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await authStore.login(email, password);

        if (!authStore.authError) {
            navigate('/home');
        }
    };

    const handleGoogleLogin = async () => {
        await authStore.loginWithGoogle();
        if (!authStore.authError) {
            navigate('/home');
        }
    };

    return (
        <div className={'flex flex-col items-center justify-center h-80vh w-screen gap-6 '}>
            <h1>Login</h1>
            {authStore.authError && <p style={{color: 'red'}}>{authStore.authError}</p>}
            <form className={'flex flex-col items-center gap-4'} onSubmit={handleSubmit}>
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
                <div  className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

                <ServiceButton
                    icon={GoogleIcon}
                    text="Continue with Google"
                    onClick={handleGoogleLogin}
                />
            </form>

            <div>
                <p>email: mono-carshop-app@gmail.com</p>
                <p>password: carshop12345678</p>
            </div>
        </div>
    );
});

export default LoginPage;
