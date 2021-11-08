import './Header.scss';
import { ElrondLogo } from '../CustomIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';
import { useState} from 'react';

export const Header = () => {

	return <div className="Header sticky-top">
		<nav className="navbar align-items-stretch flex-nowrap px-0">
			<div className="d-flex align-items-center ms-0 ms-sm-5">
					<a href="/" className="d-flex align-items-center navbar-brand">
						<ElrondLogo />
						<span className="text-secondary text-truncate">Fluxtracker</span>
					</a>
			</div>
			<div className="d-flex align-items-center pe-4">
				<ul className="flex-row navbar-nav">
					<li className="nav-item">

					</li>
				</ul>
			</div>
		</nav>
	</div>
}
