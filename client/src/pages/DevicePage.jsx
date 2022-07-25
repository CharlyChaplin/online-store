import React from 'react';
import { useEffect } from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDeviceOne } from 'redux/deviceSlice';
import { typesEnum, brandsEnum, formatter } from 'utils/consts';
import icon from 'assets/img/star-big.png';


const DevicePage = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { deviceOne, deviceOneLoading, deviceOneLoadingErrorMessage } = useSelector(state => state.device);

	const description = [
		{id: 1, title: "Оперативная память", description: "5 Гб"},
		{id: 2, title: "Камера", description: "12 Мп"},
		{id: 3, title: "Процессор", description: "Pentium"},
		{id: 4, title: "Кол-во ядер", description: "2"},
		{id: 5, title: "Аккумулятор", description: "4 000 mA"}
	]
	
	useEffect(() => {
		dispatch(getDeviceOne(id))
	}, [])

	return (
		<>
			{
				deviceOneLoading
					? <div className="spinner-grow text-danger" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
					: <Container className='mt-5'>
						<Row>
							<Col md={4} className='d-flex flex-column align-items-center'>
								<Image src={deviceOne.img} style={{ width: "150px" }} />
								<div className='mt-3 d-flex flex-column'>
									<span className='fs-4 align-self-center mb-4'>Характеристики:</span>
									<ul className='p-0'>
										{description.map(item => {
											return (
												<li className='mb-4' key={item.id}>{item.title}: {item.description}</li>
											)
										})}
									</ul>
								</div>
							</Col>
							<Col md={4}>
								<Row className='d-flex align-items-center flex-column'>
									<h2 className='fs-2 text-center mb-5'>{deviceOne.name}</h2>
									<div style={{ background: `url(${icon}) no-repeat center center`, backgroundSize: 'cover', fontSize: "45px", width: "240px", height: "240px" }} className="d-flex align-items-center justify-content-center">
										<span className='mt-3'>{deviceOne.rating}</span>
									</div>
								</Row>
							</Col>
							<Col md={4}>
								<Card className='d-flex flex-column align-items-center justify-content-around' style={{ width: "300px", height: "300px", fontSize: "32px", border: "5px solid lightgray" }}>
									<h3>от: {formatter.format(deviceOne.price)} руб.</h3>
									<button type="button" class="btn btn-outline-dark" style={{ marginTop: "100px", fontSize: "26px" }}>Добавить в корзину</button>
								</Card>

							</Col>
						</Row>

					</Container>
			}

		</>
	);
}

export default DevicePage;