import './auth.css';
import {Link, useLocation, useNavigate} from "react-router";
import * as React from "react";
import {useAuthStore} from "../../store/useAuthStore.ts";

export default function Auth() {
    const navigator = useNavigate();
    const location = useLocation();
    const pathname = location.pathname.substring(1);
    const claimedUsername = location.state?.claimedUsername;
    const registerFunc = useAuthStore(state => state.register);
    const loginFunc = useAuthStore(state => state.login);

    const [registerData, setRegisterData] = React.useState({
        email: "",
        password: "",
        username: claimedUsername || "",
        firstName: "",
        lastName: "",
    });

    const [loginData, setLoginData] = React.useState({
        usernameOrEmail: "",
        password: "",
    });

    const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        registerFunc(registerData);
        setRegisterData({
            email: "",
            password: "",
            username: "",
            firstName: "",
            lastName: "",
        });
        navigator('/dashboard');
    }

    const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginFunc(loginData);
        setLoginData({
            usernameOrEmail: "",
            password: "",
        });
        navigator('/dashboard');
    }

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    return (
        <div className="container">
            <h2 className="title">{capitalize(pathname)}</h2>
            <div className="form-container">
                {pathname === 'login' ? (
                    <form onSubmit={handleLogin} className="form">
                        <div className="input-group">
                            <label htmlFor="email_or_username">Email or Username</label>
                            <input
                                type="text"
                                placeholder="Email or Username"
                                name="email_or_username"
                                id="email_or_username"
                                required
                                value={loginData.usernameOrEmail}
                                onChange={e => setLoginData({
                                    ...loginData,
                                    usernameOrEmail: e.target.value,
                                })}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                id="password"
                                required
                                value={loginData.password}
                                onChange={e => setLoginData({
                                    ...loginData,
                                    password: e.target.value,
                                })}
                            />
                        </div>
                        <button type="submit">Submit</button>
                        <Link to="/register">Don't have an account yet?</Link>
                    </form>
                ) : (
                    <form onSubmit={handleRegister} className="form">
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                id="email"
                                required
                                value={registerData.email}
                                onChange={(e) => setRegisterData({
                                    ...registerData,
                                    email: e.target.value,
                                })}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                id="username"
                                disabled={!!claimedUsername}
                                required
                                value={registerData.username}
                                onChange={(e) => setRegisterData({
                                    ...registerData,
                                    username: e.target.value,
                                })}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                name="first_name"
                                id="first_name"
                                value={registerData.firstName}
                                onChange={(e) => setRegisterData({
                                    ...registerData,
                                    firstName: e.target.value,
                                })}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="last_name"
                                id="last_name"
                                value={registerData.lastName}
                                onChange={(e) => setRegisterData({
                                    ...registerData,
                                    lastName: e.target.value,
                                })}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                id="password"
                                required
                                value={registerData.password}
                                onChange={(e) => setRegisterData({
                                    ...registerData,
                                    password: e.target.value,
                                })}
                            />
                        </div>
                        <button type="submit">Submit</button>
                        <Link to="/login">Already have an account?</Link>
                    </form>
                )}
            </div>
        </div>
    );
}