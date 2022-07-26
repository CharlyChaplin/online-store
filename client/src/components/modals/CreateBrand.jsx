import React, { useState } from 'react';
import { useEffect } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createBrand, deleteBrand, getBrands } from 'redux/deviceSlice';


const CreateBrand = ({ show, onHide }) => {
	const [brand, setBrand] = useState('');
	const dispatch = useDispatch();

	
	const addClick = async () => {
		onHide();
		const resp = await dispatch(createBrand(brand));
		if (resp.payload.id) {
			alert("Новый бренд добавлен");
		} else {
			alert(resp.payload);
		}
	}
	const deleteClick = async () => {
		onHide();
		const resp = await dispatch(deleteBrand(brand));
		if (resp.payload.message) {
			alert(resp?.payload.message);
		} else {
			alert(resp.payload)
		}
	}


	return (
		<>
			<Modal
				show={show}
				onHide={onHide}
				centered
				className="modal fade" id="BrandModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Добавить новый бренд</h5>
						</div>
						<div className="modal-body">
							<Form>
								<input
									type="text"
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
									className="form-control"
									placeholder="Добавьте бренд..."
								/>
							</Form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								onClick={addClick}
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