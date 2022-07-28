import { nanoid } from '@reduxjs/toolkit';
import Spinner from 'components/Spinner';
import React from 'react';
import { useState } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { useDispatch, useSelector } from 'react-redux';
import { createDevice, getBrands, getTypes } from 'redux/deviceSlice';


const CreateDevice = ({ show, onHide }) => {
	const { brands, types, typesLoading, brandsLoading } = useSelector(state => state.device);
	const [type, setType] = useState(0);
	const [brand, setBrand] = useState(0);
	const [nameDevice, setNameDevice] = useState('');
	const [priceDevice, setPriceDevice] = useState(0);
	const [file, setFile] = useState(null);
	const [info, setInfo] = useState([]);
	const dispatch = useDispatch();


	const selectedFile = (e) => {
		setFile(e.target.files[0]);
	}

	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }]);
	}

	const changeInfo = (key, value, number) => {
		setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
	}

	const addDevice = async () => {
		const formData = new FormData();
		formData.append('name', nameDevice);
		formData.append('price', `${priceDevice}`);
		formData.append('img', file);
		formData.append('brandId', brand.id);
		formData.append('typeId', type.id);
		formData.append('info', JSON.stringify(info));
		const resp = await dispatch(createDevice(formData));
		if (resp.payload.id) {
			alert("Новое устройство добавлено");
			onHide();
		} else {
			alert(resp.payload);
			onHide();
		}
	}

	const deleteInfo = (number) => {
		setInfo(info.filter(i => i.number !== number));
	}

	const fetchTypesBrands = () => {
		dispatch(getTypes());
		dispatch(getBrands());
	}

	return (
		<>
			<Modal
				show={show}
				onHide={onHide}
				centered
				backdrop={'static'}
				keyboard={false}
				onShow={() => fetchTypesBrands()}
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Добавить новое устройство</h5>
						</div>
						<div className="modal-body">
							<Form>
								<Dropdown>
									<DropdownToggle>{type?.name || 'Выберите тип устройства'}</DropdownToggle>
									<DropdownMenu>
										{
											!typesLoading
												? types &&
												types.length > 0 &&
												types.map(item => {
													return (
														<DropdownItem key={item.id} onClick={() => setType(item)}>{item.name}</DropdownItem>
													)
												})
												: [3].map((_, index) => {
													return (
														<Spinner key={nanoid()} />
													)
												})

										}
									</DropdownMenu>
								</Dropdown>
								<Dropdown className='mt-3'>
									<DropdownToggle>{brand?.name || 'Выберите бренд'}</DropdownToggle>
									<DropdownMenu>
										{
											!brandsLoading
												? brands &&
												brands.length > 0 &&
												brands.map(item => {
													return (
														<DropdownItem key={item.id} onClick={() => setBrand(item)}>{item.name}</DropdownItem>
													)
												})
												: [3].map(() => {
													return (
														<Spinner key={nanoid()}/>
													)
												})
										}
									</DropdownMenu>
								</Dropdown>
								<Form.Control
									className='mt-3'
									value={nameDevice}
									onChange={e => setNameDevice(e.target.value)}
									placeholder='Введите название устройства'
								/>
								<Form.Control
									type='number'
									className='mt-3'
									value={priceDevice}
									onChange={e => setPriceDevice(Number(e.target.value))}
									placeholder='Введите стоимость устройства'
								/>
								<Form.Control
									type='file'
									className='mt-3'
									onChange={selectedFile}
								/>
								<hr />
								<Button variant='outline-dark' onClick={() => addInfo()}>
									Добавить новое свойство
								</Button>
								{
									info.map(item => {
										return (
											<Row className='mt-4' key={item.number}>
												<Col md={4}>
													<Form.Control
														value={item.title}
														placeholder='Введите название устройства'
														onChange={e => changeInfo('title', e.target.value, item.number)}
													/>
												</Col>
												<Col md={4}>
													<Form.Control
														value={item.description}
														placeholder='Введите описание устройства'
														onChange={e => changeInfo('description', e.target.value, item.number)}
													/>
												</Col>
												<Col md={4}>
													<Button variant='outline-danger' onClick={() => deleteInfo(item.number)}>X</Button>
												</Col>
											</Row>
										)
									})
								}
							</Form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								onClick={onHide}
							>
								Закрыть
							</button>
							<button
								type="button"
								className="btn btn-primary"
								onClick={addDevice}
							>
								Добавить
							</button>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default CreateDevice;