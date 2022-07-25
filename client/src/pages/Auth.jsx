import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { fetchLogin, fetchRegistation, setAdmin, setAuth } from 'redux/userSlice.js';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from 'utils/consts';
import jwt from 'jsonwebtoken';


const Auth = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userData, errorDesc } = useSelector(state => state.user);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const isLogin = location.pathname === LOGIN_ROUTE;

	useEffect(() => {
		if (Boolean(userData.token)) {
			window.localStorage.setItem('token', JSON.stringify(userData.token));
			dispatch(setAuth(true));
			const decoded = jwt.decode(userData.token, { complete: true });
			if ('role' in decoded.payload) {
				dispatch(setAdmin(decoded.payload.role === "ADMIN"));
				navigate(LOGIN_ROUTE);
			}
		}
	}, [userData]);

	useEffect(() => {
		if (errorDesc.length > 0) alert(errorDesc);
	}, [errorDesc]);


	const handleSubmit = (e) => {
		e.preventDefault();
		if (isLogin) {
			dispatch(fetchLogin({ email, password }));
		} else {
			dispatch(fetchRegistation({ email, password }));
		}

	}

	return (
		<>
			<Container
				className='d-flex justify-content-center align-items-center'
				style={{ height: window.innerHeight - 54 }}>

				<div className="card p-5 bg-secondary bg-gradient text-white fs-2" style={{ width: 600, textTransform: "upperCase" }}>
					<h2 className="m-auto mb-5">{isLogin ? "Авторизация" : "Регистрация"}</h2>
					<form className='d-flex flex-column' onSubmit={handleSubmit}>
						<input autoFocus value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control mb-3" placeholder="Enter e-mail..." />
						<input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control mb-3" placeholder="Enter password..." />
						<div className="row d-flex flex-row fs-6 justify-content-between">
							{
								isLogin
									? <div className="mb-2 mt-2">No account?&nbsp;&nbsp;&nbsp;<NavLink to={REGISTRATION_ROUTE}>Registration</NavLink></div>
									: <div className="mb-2 mt-2">Have an accout?&nbsp;&nbsp;&nbsp;<NavLink to={LOGIN_ROUTE}>Login</NavLink></div>
							}
							<button type="submit" className="btn btn-outline-light">{isLogin ? "Login" : "Registration"}</button>
						</div>
					</form>
				</div>

			</Container>
		</>
	);
}

export default Auth;