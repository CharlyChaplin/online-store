import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.sass';

const Header = () => {
	return (
		<>
			<div className="header__menu menu">
				<nav className={styles.menu__body}>
					<ul className={styles.menu__list}>
						<li className={styles.menu__item}><NavLink to ="/" className={styles.menu__link}>Home</NavLink></li>
						<li className={styles.menu__item}><NavLink to="/admin" className={styles.menu__link}>Admin</NavLink></li>
						<li className={styles.menu__item}><NavLink to="/auth" className={styles.menu__link}>Auth</NavLink></li>
						<li className={styles.menu__item}><NavLink to="/basket" className={styles.menu__link}>Basket</NavLink></li>
						<li className={styles.menu__item}><NavLink to="/device" className={styles.menu__link}>Device</NavLink></li>
						<li className={styles.menu__item}><NavLink to="/shop" className={styles.menu__link}>Shop</NavLink></li>
					</ul>
				</nav>
			</div>
		</>
	);
}

export default Header;