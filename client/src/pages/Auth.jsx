import React from 'react';
import { Container } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from 'utils/consts';


const Auth = () => {
	const location = useLocation();
	
	const isLogin = location.pathname === LOGIN_ROUTE;
	
	return (
		<>
			<Container
				className='d-flex justify-content-center align-items-center'
				style={{ height: window.innerHeight - 54 }}>

				<div className="card p-5 bg-secondary bg-gradient text-white fs-2" style={{ width: 600, textTransform: "upperCase" }}>
					<h2 className="m-auto mb-5">{isLogin ? "Авторизация" : "Регистрация"}</h2>
					<form className='d-flex flex-column'>
						<input type="email" className="form-control mb-3" placeholder="Enter e-mail..." />
						<input type="password" className="form-control mb-3" placeholder="Enter password..." />
						<div className="row d-flex flex-row fs-6 justify-content-between">
							{
								isLogin
									? <div className="mb-2 mt-2">No account?&nbsp;&nbsp;&nbsp;<NavLink to={REGISTRATION_ROUTE}>Registration</NavLink></div>
									: <div className="mb-2 mt-2">Have an accout?&nbsp;&nbsp;&nbsp;<NavLink to={LOGIN_ROUTE}>Login</NavLink></div>
							}
							<button type="button" className="btn btn-outline-light">{isLogin ? "Login" : "Registration"}</button>
						</div>
					</form>
				</div>

			</Container>
		</>
	);
}

export default Auth;