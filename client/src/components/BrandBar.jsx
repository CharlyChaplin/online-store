import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, setSelectedBrand } from 'redux/deviceSlice';
import Spinner from './Spinner';


const BrandBar = () => {
	const { brands, selectedBrand, brandsLoading, brandsLoadingErrorMessage } = useSelector(state => state.device);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBrands());
	}, [])

	const setActive = (i) => {
		dispatch(setSelectedBrand(i));
	}

	return (
		<>
			<div className="row" style={{ display: 'flex', flexDirection: 'row' }}>
				{
					brandsLoading
						? <Spinner />
						: brands &&
						brands.length > 0 &&
						brands.map((item) => {
							return (
								<div className={selectedBrand === item.id ? 'card p-3 active border-danger' : 'card p-3 active border-light'}
									key={item.id}
									style={{ width: "auto", marginRight: '10px', cursor: 'pointer' }}
									onClick={() => setActive(item.id)}
								>
									{item.name}
								</div>
							)
						})
						|| <div>No Brands</div>
				}
			</div>
		</>
	);
}

export default BrandBar;