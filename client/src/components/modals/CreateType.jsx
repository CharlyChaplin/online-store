import React from 'react';
import { Form, Modal } from 'react-bootstrap';

const CreateType = ({ show, onHide }) => {
	return (
		<>
			<Modal
				show={show}
				onHide={onHide}
				centered
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Добавить новый тип</h5>
						</div>
						<div className="modal-body">
							<Form>
								<input type="text" className="form-control" placeholder="Добавьте тип устройства..." />
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

export default CreateType;