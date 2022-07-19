import NotFound from './NotFound';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from 'routes';
import Header from './Header';


const AppRouter = () => {
	const isAuth = false;
	
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