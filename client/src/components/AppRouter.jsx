import NotFound from './NotFound';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from 'routes';
import Header from './Header';
import { useSelector } from 'react-redux';


const AppRouter = () => {
	const isAuth = useSelector(state => state.user.isAuth);

	return (
		<>
			<Header />
			<Routes>
				{
					isAuth
						? authRoutes.map(({ path, element }) =>
							<Route key={path} path={path} element={element} />
						)
						: publicRoutes.map(({ path, element }) =>
							<Route key={path} path={path} element={element} />
						)
				}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default AppRouter;