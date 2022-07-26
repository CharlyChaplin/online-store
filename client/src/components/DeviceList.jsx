import React from 'react';
import { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDevices } from 'redux/deviceSlice';
import DeviceItem from './DeviceItem';


const DeviceList = () => {
	const { devices, selectedDevice, deviceLoading, deviceLoadingErrorMessage } = useSelector(state => state.device);
	const dispatch = useDispatch();

	
	useEffect(() => {
		dispatch(getDevices());
	}, [])
	

	return (
		<>
			<Row className='d-flex mt-5'>
				{deviceLoading
					? <div className="spinner-grow text-danger" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
					: devices.map(item => {
						return (
							<DeviceItem key={item.id} device={item} />
						)
					})
				}
			</Row>
		</>
	);
}

export default DeviceList;