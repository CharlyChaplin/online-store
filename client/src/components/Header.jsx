import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setAuth } from 'store/userSlice.js';
import { SHOP_ROUTE, BASKET_ROUTE, ADMIN_ROUTE } from '../utils/consts.js';


const Header = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(state => state.user.isAuth);
	const navigate = useNavigate();

	const login = () => {
		dispatch(setAuth(true));
		navigate('/login');
	}
	const logout = () => {
		dispatch(setAuth(false));
		navigate('/');
	}

	return (
		<nav className="navbar navbar-expand-lg bg-secondary bg-gradient ">
			<div className="container-fluid">
				<NavLink className="navbar-brand text-white" to={SHOP_ROUTE}>КупиДевайс</NavLink>
				<div className="collapse navbar-collapse" id="navbarNav">
					{
						isAuth
							? <ul className="navbar-nav" style={{ marginLeft: "auto" }}>
								<button type="button" className="btn btn-outline-light">Админ панель</button>
								<button type="button" className="btn btn-outline-light ms-4" onClick={logout}>Войти</button>
							</ul>
							: <ul className="navbar-nav" style={{ marginLeft: "auto" }}>
								<button type="button" className="btn btn-outline-light" onClick={login}>Авторизация</button>
							</ul>
					}

				</div>
			</div>
		</nav>

	);
}

export default Header;