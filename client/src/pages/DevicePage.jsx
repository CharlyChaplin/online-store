import React from 'react';
import { useEffect } from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDeviceOne } from 'redux/deviceSlice';
import { formatter } from 'utils/consts';
import icon from 'assets/img/star-big.png';
import Spinner from 'components/Spinner';
import { addToCart } from 'redux/cartSlice';


const DevicePage = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { deviceOne, deviceOneLoading, devices } = useSelector(state => state.device);
	const { cart } = useSelector(state => state.cart);


	useEffect(() => {
		dispatch(getDeviceOne(id));
	}, [cart])

	const addClick = async () => {
		const productAdd = devices.filter(item => item.id === deviceOne.id)[0];

		const resp = await dispatch(addToCart(productAdd));
		if (resp.payload.id === deviceOne.id) {
			console.log("Добавлено");
		} else {
			console.log(resp.payload);
		}
	}

	return (
		<>
			{
				deviceOneLoading
					? <Spinner />
					: <Container className='mt-5'>
						<Row>
							<Col md={4} className='d-flex flex-column align-items-center'>
								<Image src={`${process.env.REACT_APP_SERVER_ADR}/${deviceOne.img}`} style={{ width: "150px" }} />
								<div className='mt-3 d-flex flex-column'>
									<span className='fs-4 align-self-center mb-4'>Характеристики:</span>
									<ul className='p-0'>
										{
											deviceOne?.info &&
											deviceOne.info.map(item => {
												return (
													<li className='mb-4 d-flex align-items-center' key={item.id}>
														<Col md={6} style={{marginRight: "20px"}}>
															{item.title}:
														</Col>
														<Col md={6} style={{fontWeight: 'bold'}}>
															{item.description}
														</Col>
													</li>
												)
											})
										}
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
									<button
										type="button"
										className="btn btn-outline-dark"
										style={{ marginTop: "100px", fontSize: "26px" }}
										onClick={addClick}
									>Добавить в корзину
									</button>
								</Card>

							</Col>
						</Row>

					</Container>
			}

		</>
	);
}

export default DevicePage;