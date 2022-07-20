import React, { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchAuth, setAdmin, setAuth, setLogout } from 'store/userSlice.js';
import { LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts.js';
import jwt from 'jsonwebtoken';


const Header = () => {
	const dispatch = useDispatch();
	const { isAuth, isAdmin, isLoading } = useSelector(state => state.user);
	const navigate = useNavigate();
	let token = '';

	useEffect(() => {
		console.log(isAuth);
		if (isAuth) navigate(SHOP_ROUTE);
	}, [isAuth, isAdmin]);

	const goAuth = async () => {
		token = JSON.parse(window.localStorage.getItem('token'))
		if (token) {
			const data = await dispatch(fetchAuth());
			if (data.payload.token) {
				const decoded = jwt.decode(data.payload.token, { complete: true });
				if ('role' in decoded.payload) {
					dispatch(setAdmin(decoded.payload.role === "ADMIN"));
				}
			}
		}
	}

	useEffect(() => {
		goAuth();
	}, [token])


	const login = () => {
		navigate(LOGIN_ROUTE);
	};

	const logout = () => {
		dispatch(setLogout());
		dispatch(setAuth(false));
		window.localStorage.removeItem('token');
		navigate('/');
	}

	const out = (isAuth, isLoading) => {
		if (isLoading) {
			return (
				<div class="spinner-grow text-danger" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
			)
		} else {
			if (isAuth) {
				return (
					<>
						{
							isAdmin && <button type="button" className="btn btn-outline-light">Админ панель</button>
						}
						<button type="button" className="btn btn-outline-light ms-4" onClick={logout}>Выйти</button>
					</>
				)
			} else {
				return (<button type="button" className="btn btn-outline-light" onClick={login}>Авторизация</button>)
			}
		}
	}

	const myOut = out(isAuth, isLoading);

	return (
		<nav className="navbar navbar-expand-sm bg-secondary bg-gradient ">
			<div className="container-fluid">
				<NavLink className="navbar-brand text-white" to={SHOP_ROUTE}>КупиДевайс</NavLink>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav" style={{ marginLeft: "auto" }}>
						{/*{
							isAuth
								? <>
									{
										isAdmin && <button type="button" className="btn btn-outline-light">Админ панель</button>
									}
									<button type="button" className="btn btn-outline-light ms-4" onClick={logout}>Выйти</button>
								</>
								: <button type="button" className="btn btn-outline-light" onClick={login}>Авторизация</button>
						}*/}
						{myOut}
					</ul>
				</div>
			</div>
		</nav>

	);
}

export default Header;