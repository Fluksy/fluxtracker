import './Header.scss';
import { useTranslation } from 'react-i18next';
import { ElrondLogo } from '../CustomIcons';
import ReactFlagsSelect from 'react-flags-select';
import { useEffect, useState } from 'react';
import { locales } from '../../locales';

export const Header = () => {
	const { i18n } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

	useEffect(() => {
		i18n.changeLanguage(currentLanguage);
		localStorage.setItem('user-language', currentLanguage);
	}, [currentLanguage])


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
					<ReactFlagsSelect
						countries={Object.keys(locales)}
						showOptionLabel={false}
						showSelectedLabel={false}
						selected={currentLanguage}
						style={{ backgroundColor: '#18191a' }}
						onSelect={(code) => setCurrentLanguage(code)}
					/>
				</ul>
			</div>
		</nav>
	</div>
}
