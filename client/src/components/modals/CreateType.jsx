import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createType, deleteType } from 'redux/deviceSlice';

const CreateType = ({ show, onHide }) => {
	const [type, setType] = useState('');
	const dispatch = useDispatch();

	const addClick = async () => {
		onHide();
		const resp = await dispatch(createType(type));
		if (resp.payload.id) {
			alert("Новый тип добавлен");
		} else {
			alert(resp.payload);
		}
	}
	const deleteClick = async () => {
		onHide();
		const resp = await dispatch(deleteType(type));
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
							<h5 className="modal-title">Добавить новый тип</h5>
						</div>
						<div className="modal-body">
							<Form>
								<input
									type="text"
									value={type}
									onChange={(e) => setType(e.target.value)}
									className="form-control"
									autoFocus
									placeholder="Добавьте тип устройства..."
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

export default CreateType;