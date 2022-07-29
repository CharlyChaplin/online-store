import { nanoid } from '@reduxjs/toolkit';
import Spinner from 'components/Spinner';
import React, { useState } from 'react';
import { Dropdown, Form, Modal } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { useDispatch, useSelector } from 'react-redux';
import { createBrand, deleteBrand, getBrands } from 'redux/deviceSlice';


const CreateBrand = ({ show, onHide }) => {
	const { brands, brandsLoading } = useSelector(state => state.device);
	const [brand, setBrand] = useState('');
	const dispatch = useDispatch();
	const [check, setCheck] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const [inputMode, setInputMode] = useState(true);

	const handleExpand = () => {
		setExpanded(!expanded);
		if (!expanded) dispatch(getBrands());
	}
	const showAllBrands = (e) => {
		setCheck(e.target.checked);
		setInputMode(!e.target.checked);
	}

	const addClick = async () => {
		onHide();
		if (brand.length > 0) {
			const resp = await dispatch(createBrand(brand));
			if (resp.payload.id) {
				alert("Новый бренд добавлен");
			} else {
				alert(resp.payload);
			}
		} else {
			alert("Поле не может быть пустым")
		}
	}
	const deleteClick = async () => {
		onHide();
		const resp = await dispatch(deleteBrand(brand));
		if (resp.payload.message) {
			alert(resp.payload.message);
		} else {
			alert(resp.payload)
		}
	}


	return (
		<>
			<Modal show={show} onHide={onHide} centered>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Добавить новый бренд</h5>
						</div>
						<div className="modal-body">
							<Form>
								{
									inputMode
										?
										<input
											type="text"
											value={brand}
											onChange={(e) => setBrand(e.target.value)}
											className="form-control"
											autoFocus
											placeholder="Добавьте бренд..."
										/>
										: <Dropdown show={expanded} onClick={handleExpand}>
											<DropdownToggle>{!brand && 'Выберите бренд' || brand}</DropdownToggle>
											<DropdownMenu>
												{
													!brandsLoading
														? brands &&
														brands.length > 0 &&
														brands.map(item => {
															return (
																<DropdownItem key={item.id} onClick={() => setBrand(item.name)}>{item.name}</DropdownItem>
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
										onChange={showAllBrands}
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
								onClick={addClick}
							>
								Добавить
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

export default CreateBrand;