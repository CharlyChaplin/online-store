import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, setLimit, setPage, setSelectedType } from 'redux/deviceSlice';
import Spinner from './Spinner';


const TypeBar = () => {
	const { types, selectedType, typesLoading } = useSelector(state => state.device);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTypes());
	}, [])

	const setActive = (i) => {
		dispatch(setSelectedType(i));
		dispatch(setPage(1));
	}


	return (
		<>
			<ul className="list-group">
				{
					typesLoading
						? <Spinner />
						: types &&
						types.length > 0 &&
						types.map((item, index) => {
							return (
								<li
									className={selectedType === item.id ? "list-group-item active p-4 fs-4" : "list-group-item p-4 fs-4"}
									key={item.id}
									onClick={() => setActive(index + 1)}
									style={{ cursor: 'pointer' }}
								>
									{item.name}
								</li>
							)
						})
						|| <div>No Types</div>
				}
			</ul>
		</>
	);
}

export default TypeBar;