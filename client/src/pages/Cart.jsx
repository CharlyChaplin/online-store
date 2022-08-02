import { nanoid } from '@reduxjs/toolkit';
import { Button } from 'react-bootstrap';
import React from 'react';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteCart, minusCart } from 'redux/cartSlice';


const Cart = () => {
	const dispatch = useDispatch();
	const { cart, cartLoading, cartError } = useSelector(state => state.cart);

		
	const products = cart.map(item => {
		return (
			<ListGroup.Item className='d-flex flex-row' key={nanoid()}>
				<Row className='mt-4 d-flex flex-row align-items-center justify-content-start' key={nanoid()} style={{ width: "100%" }}>
					<Col md={2} style={{ width: 'auto' }}>
						<span><Image src={`${process.env.REACT_APP_SERVER_ADR}/${item.img}`} style={{ width: "100px", height: "100px" }} /></span>
					</Col>
					<Col md={2} style={{ width: '400px' }}>
						<span>{item.name}</span>
					</Col>
					<Col md={2} style={{ width: '100px', flex: "1 1 auto" }}>
						<span>{item.price}</span>
					</Col>
					<Col md={2} className="d-flex" style={{ width: '100px', marginRight: "50px" }}>
						<Button style={{marginRight: "5px", width: "40px"}} onClick={() => dispatch(addToCart(item))}>+</Button>
						<Button style={{marginRight: "5px", width: "40px"}} onClick={() => dispatch(minusCart(item))}>-</Button>
						<Button className="btn btn-danger" style={{width: "40px"}} onClick={() => dispatch(deleteCart(item))}>x</Button>
					</Col>
					<Col md={3} style={{ width: 'auto' }}>
						<span>{item.count} шт.</span>
					</Col>
				</Row>
			</ListGroup.Item>
		)
	})

	return (
		<>
			{
				cart.length > 0
					? <ListGroup>
						{products}
					</ListGroup>
					: <Row style={{
						margin: "auto",
						fontFamily: "Arial",
						fontSize: "30px",
						textTransform: 'uppercase',
						fontWeight: 'bold'
					}}>
						Корзина пуста
					</Row>
			}
		</>
	);
}

export default Cart;