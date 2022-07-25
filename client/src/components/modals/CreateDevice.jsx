import React from 'react';
import { useState } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { useSelector } from 'react-redux';

const CreateDevice = ({ show, onHide }) => {
	const {brands, types} = useSelector(state => state.device);
	const [info, setInfo] = useState([]);
	
	
	const addInfo = () => {
		setInfo([...info, {title: '', description: '', number: Date.now()}]);
	}
	
	const deleteInfo = (number) => {
		setInfo(info.filter(i => i.number !== number));
	}
	
	return (
		<>
			<Modal
				show={show}
				onHide={onHide}
				centered
				backdrop={'static'}
				keyboard={false}
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Добавить новое устройство</h5>
						</div>
						<div className="modal-body">
							<Form>
								<Dropdown>
									<DropdownToggle>Выберите тип устройства</DropdownToggle>
									<DropdownMenu>
										{
											types &&
											types.length > 0 &&
											types.map(item => {
												return (
													<DropdownItem key={item.id}>{item.name}</DropdownItem>
												)
											})
										}
									</DropdownMenu>
								</Dropdown>
								<Dropdown className='mt-3'>
									<DropdownToggle>Выберите бренд</DropdownToggle>
									<DropdownMenu>
										{
											brands &&
											brands.length > 0 &&
											brands.map(item => {
												return (
													<DropdownItem key={item.id}>{item.name}</DropdownItem>
												)
											})
										}
									</DropdownMenu>
								</Dropdown>
								<Form.Control className='mt-3' placeholder='Введите название устройства' />
								<Form.Control type='number' className='mt-3' placeholder='Введите стоимость устройства' />
								<Form.Control type='file' className='mt-3' />
								<hr />
								<Button variant='outline-dark' onClick={() => addInfo()}>
									Добавить новое свойство
								</Button>
								{
									info.map(item => {
										return(
											<Row className='mt-4' key={item.number}>
												<Col md={4}>
													<Form.Control placeholder='Введите название устройства'/>
												</Col>
												<Col md={4}>
													<Form.Control placeholder='Введите описание устройства' />
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
								onClick={onHide}
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