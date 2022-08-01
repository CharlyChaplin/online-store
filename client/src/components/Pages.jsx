import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from 'redux/deviceSlice';


const Pages = () => {
	const { page, limit, deviceCount } = useSelector(state => state.device);
	const dispatch = useDispatch();

	const pagesCount = Math.ceil(deviceCount / limit);
	const pages = [];

	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	const getPage = (pageNumber) => {
		console.log("pageNumber = ", pageNumber);
		dispatch(setPage(pageNumber));
	}


	return (
		<Pagination className='mt-3'>
			{
				pages.map((item, index) => {
					return (
						<Pagination.Item
							key={index}
							active={item === page}
							onClick={() => getPage(item)}
						>
							{item}
						</Pagination.Item>
					)
				})
			}
		</Pagination>
	);
}

export default Pages;