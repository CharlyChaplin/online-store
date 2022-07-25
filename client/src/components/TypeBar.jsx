import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, setSelectedType } from 'redux/deviceSlice';


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
						? <div className="spinner-grow text-danger" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
						: types.map((item, index) => {
							return (
								<li
									className={selectedType === index ? "list-group-item active p-4 fs-4" : "list-group-item p-4 fs-4"}
									key={item.id}
									onClick={() => setActive(index)}
									style={{cursor: 'pointer'}}
								>
									{item.name}
								</li>
							)
						})
				}
			</ul>
		</>
	);
}

export default TypeBar;