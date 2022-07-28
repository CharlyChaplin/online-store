import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, setSelectedType } from 'redux/deviceSlice';
import Spinner from './Spinner';


const TypeBar = () => {
	const { types, selectedType, typesLoading, typesLoadingErrorMessage } = useSelector(state => state.device);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTypes());
	}, [])

	const setActive = (i) => {
		dispatch(setSelectedType(i));
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
									className={selectedType === index ? "list-group-item active p-4 fs-4" : "list-group-item p-4 fs-4"}
									key={item.id}
									onClick={() => setActive(index)}
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