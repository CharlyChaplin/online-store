import React from 'react';
import { useEffect } from 'react';
import { Dropdown, Form, Modal } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from 'redux/deviceSlice';


const CreateBrand = ({ show, onHide }) => {
	const { brands } = useSelector(state => state.device);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBrands());
	}, [])


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
								<Dropdown>
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

export default CreateBrand;