import Admin from 'pages/Admin';
import Auth from 'pages/Auth';
import Basket from 'pages/Basket';
import DevicePage from 'pages/DevicePage';
import Shop from 'pages/Shop';
import Home from 'pages/Home';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';


const AppRouter = () => {
	return (
		<>
			<Header />

			<Routes>
				<Route path ='/' element={<Home />} />
				<Route path ='/admin' element={<Admin />} />
				<Route path='/auth' element={<Auth />} />
				<Route path='/basket' element={<Basket />} />
				<Route path='/device' element={<DevicePage />} />
				<Route path='/shop' element={<Shop />} />
			</Routes>
		</>
	);
}

export default AppRouter;