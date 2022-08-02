import React from 'react';
import { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDevices } from 'redux/deviceSlice';
import DeviceItem from './DeviceItem';
import Spinner from './Spinner';


const DeviceList = () => {
	const { devices, deviceLoading, selectedType, selectedBrand, page, limit } = useSelector(state => state.device);
	const dispatch = useDispatch();


	useEffect(() => {
		if (selectedType || selectedBrand) {
			dispatch(getDevices({ selectedType, selectedBrand, page, limit }));
		} else {
			dispatch(getDevices({page}));
		}
	}, [selectedType, selectedBrand, page]);


	return (
		<>
			<Row className='d-flex mt-5'>
				{deviceLoading
					? <Spinner />
					: devices &&
					devices.length > 0 &&
					devices.map(item => {
						return (
							<DeviceItem key={item.id} device={item} />
						)
					})
					|| <div>No Data</div>
				}
			</Row>
		</>
	);
}

export default DeviceList;