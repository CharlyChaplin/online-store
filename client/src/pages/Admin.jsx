import CreateBrand from 'components/modals/CreateBrand';
import CreateDevice from 'components/modals/CreateDevice';
import CreateType from 'components/modals/CreateType';
import React from 'react';
import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';


const Admin = () => {
	const [brandVisible, setBrandVisible] = useState(false);
	const [deviceVisible, setDeviceVisible] = useState(false);
	const [typeVisible, setTypeVisible] = useState(false);


	return (
		<>
			<Container className='mt-5'>
				<Row style={{ width: "331px", height: "64px" }} className="mb-4">
					<button
						type="button"
						className="btn btn-outline-dark"
						data-bs-toggle="modal"
						data-bs-target="#staticBackdrop"
						onClick={() => setTypeVisible(true)}
					>
						Добавить новый тип
					</button>
				</Row>

				<Row style={{ width: "331px", height: "64px" }} className="mb-4">
				<button
						type="button"
						className="btn btn-outline-dark"
						data-bs-toggle="modal"
						data-bs-target="#BrandModal"
						onClick={() => setBrandVisible(true)}
					>
						Добавить новый бренд
					</button>
				</Row>

				<Row style={{ width: "331px", height: "64px" }}>
				<button
						type="button"
						className="btn btn-outline-dark"
						data-bs-toggle="modal"
						data-bs-target="#staticBackdrop"
						onClick={() => setDeviceVisible(true)}
					>
						Добавить новое устройство
					</button>
				</Row>

				<CreateBrand show={brandVisible} onHide={() => setBrandVisible()} />
				<CreateDevice show={deviceVisible} onHide={() => setDeviceVisible()} />
				<CreateType show={typeVisible} onHide={() => setTypeVisible()} />
			</Container>
		</>
	);
}

export default Admin;