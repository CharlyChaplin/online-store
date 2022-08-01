import { nanoid } from '@reduxjs/toolkit';
import Spinner from 'components/Spinner';
import React, { useState } from 'react';
import { Dropdown, Form, Modal } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDevice, getDevices } from 'redux/deviceSlice';

const DeleteDevice = ({ show, onHide }) => {
	const { devices, deviceLoading } = useSelector(state => state.device);
	const [device, setDevice] = useState('');
	const [check, setCheck] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const [inputMode, setInputMode] = useState(true);
	const dispatch = useDispatch();


	
	const deleteClick = async () => {
		onHide();
		const deleteId = devices.find(item => item.name === device).id;
		const resp = await dispatch(deleteDevice(deleteId));
		if (resp.payload.message) {
			alert(resp.payload.message);
		} else {
			alert(resp.payload)
		}
	}
	
	const handleExpand = () => {
		setExpanded(!expanded);
		if (!expanded) dispatch(getDevices({}));
	}
	const showAllDevices = (e) => {
		setCheck(e.target.checked);
		setInputMode(!e.target.checked);
	}

	return (
		<>
			<Modal show={show} onHide={onHide} centered>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Название удаляемого устройства</h5>
						</div>
						<div className="modal-body">
							<Form>
								{
									inputMode
										?
										<input
											type="text"
											value={device}
											onChange={(e) => setDevice(e.target.value)}
											className="form-control"
											autoFocus
											placeholder="Введите название..."
										/>
										: <Dropdown show={expanded} onClick={handleExpand}>
											<DropdownToggle>{!device && 'Выберите устройство' || device}</DropdownToggle>
											<DropdownMenu>
												{
													!deviceLoading
														? devices &&
														devices.length > 0 &&
														devices.map(item => {
															return (
																<DropdownItem key={item.id} onClick={() => setDevice(item.name)}>{item.name}</DropdownItem>
															)
														})
														: [3].map(() => {
															return (
																<Spinner key={nanoid()} />
															)
														})
												}
											</DropdownMenu>
										</Dropdown>
								}
								<div className="form-check mt-2" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
									<input
										className="form-check-input"
										type="checkbox"
										id="flexCheckDefault"
										style={{ marginTop: "2px" }}
										onChange={showAllDevices}
										checked={check}
									/>
									<label className="form-check-label" style={{ marginLeft: "10px", height: "100%" }} htmlFor="flexCheckDefault">
										Показать весь список устройств
									</label>
								</div>
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
								onClick={deleteClick}
							>
								Удалить
							</button>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default DeleteDevice;