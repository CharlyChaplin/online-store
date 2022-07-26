import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createBrand, deleteBrand } from 'redux/deviceSlice';


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
								<input
									type="text"
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
									className="form-control"
									autoFocus
									placeholder="Добавьте бренд..."
								/>
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