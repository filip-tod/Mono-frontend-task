import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import authStore from "../../stores/AuthStore.ts";
import GoogleIcon from '../../assets/icons/google/icons8-google.svg';
import ServiceButton from "../../components/ServiceButton.tsx";

const LoginPage = observer(() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoginInfo, setShowLoginInfo] = useState(false); // Dodano stanje za prikaz informacija
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await authStore.login(email, password);

        if (!authStore.authError) {
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        }
    };

    const handleGoogleLogin = async () => {
        await authStore.loginWithGoogle();
        if (!authStore.authError) {
            navigate('/home');
        }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-screen pt-20 gap-6">
          <div><h1>Car Shop App</h1></div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-lg">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg w-full max-w-md">
                  <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                  {authStore.authError && <p style={{ color: 'red' }}>{authStore.authError}</p>}
                  <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
                      <div className="w-full">
                          <label>Email:</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                      </div>
                      <div className="w-full">
                          <label>Password:</label>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                      </div>
                      <button type="submit" disabled={authStore.loading} className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 border-white">
                          {authStore.loading ? 'Loading...' : 'Login'}
                      </button>
                      <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      <p>Or Use A Service</p>
                      <ServiceButton
                        icon={GoogleIcon}
                        text="Continue with Google"
                        onClick={handleGoogleLogin}
                      />
                  </form>
              </div>
          </div>
          <button
            onClick={() => setShowLoginInfo(!showLoginInfo)}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
              {showLoginInfo ? 'Hide Login Info' : 'Show Login Info'}
          </button>
          {showLoginInfo && (
            <div className="mt-4">
                <p><span className="text-fuchsia-700 text-xl">email:</span> mono-carshop-app@gmail.com</p>
                <p><span className="text-fuchsia-700 text-xl">password:</span> carshop12345678</p>
            </div>
          )}
      </div>
    );
});

export default LoginPage;
