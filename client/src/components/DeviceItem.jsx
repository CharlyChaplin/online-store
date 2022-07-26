import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import icon from 'assets/img/star.png';
import './styles.sass';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE, formatter } from 'utils/consts';
import { useSelector } from 'react-redux';


const DeviceItem = ({ device }) => {
	const {types, brands} = useSelector(state => state.device);
	const navigate = useNavigate();
	

	return (
		<>
			{
				<Col md={3} className="mt-3">
					<Card style={{ cursor: 'pointer' }} onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}>
						<Image src={`http://localhost:5000/${device.img}`} className="card-img-top" alt={device.name} style={{ width: "150px", height: "150px" }} />
						<div className="card-body">
							<h5 className="card-title text-black-50 root">
								<span>{types.filter(m => m.id === device.typeId)[0].name}</span>
								&nbsp;
								<span>{device.name}</span>

							</h5>
							<h5 className="card-title">
								{brands.filter(m => m.id === device.brandId)[0].name}
							</h5>
							<h6 className="card-title" style={{ fontWeight: "bold" }}>{formatter.format(device.price)} руб.</h6>
							<h5 className="d-flex justify-content-end align-items-end">
								{formatter.format(device.rating)}
								&nbsp;
								<Image src={icon} />
							</h5>
						</div>
					</Card>
				</Col>

			}
		</>
	);
}

export default DeviceItem;