import BrandBar from 'components/BrandBar';
import DeviceList from 'components/DeviceList';
import Pages from 'components/Pages';
import TypeBar from 'components/TypeBar';
import React from 'react';
import { Button, Col, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { resetFilter } from 'redux/deviceSlice';


const Shop = () => {
	const dispatch = useDispatch();
	
	return (
		<Container>
			<div className="row mt-2">
				<Col md={3} >
					<TypeBar />
					<Button
						style={{ display: 'flex', margin: "10px auto 0px auto" }}
						onClick={() => dispatch(resetFilter())}
					>
						Сбросить фильтры
					</Button>
				</Col>
				<Col md={9}>
					<BrandBar />
					<DeviceList />
					<Pages />
				</Col>
			</div>
		</Container>
	);
}

export default Shop;