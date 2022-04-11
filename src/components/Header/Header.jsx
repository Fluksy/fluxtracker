import './Header.scss';
import { ElrondLogo } from '../';
import ReactFlagsSelect from 'react-flags-select';
import { locales } from '../../locales';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLocale } from 'react-redux-i18n';
import { KEY_LANGUAGE_LOCAL_STORAGE } from '../../locales'

const Header = ({ setLocale, locale }) => {
	return <div className="Header sticky-top">
		<nav className="navbar align-items-stretch flex-nowrap px-0">
			<div className="d-flex align-items-center ms-3 ms-sm-5">
				<Link to='/search' className="d-flex rounded p-2 align-items-center navbar-brand maiar-shadow">
					<ElrondLogo />
					<span className="p-0 ps-sm-3 text-secondary text-truncate">Fluxtracker</span>
				</Link>
			</div>
			<div className="d-flex align-items-center pe-4">
				<ul className="flex-row navbar-nav">
					<ReactFlagsSelect
						countries={Object.keys(locales)}
						showOptionLabel={false}
						showSelectedLabel={false}
						selected={locale}
						style={{ backgroundColor: '#18191a' }}
						onSelect={(code) => setLocale(code)}
					/>
				</ul>
			</div>
		</nav>
	</div>
}

const mapStateToProps = ({i18n}) => ({locale : i18n.locale})
const mapDispatchToProps = dispatch => ({setLocale : locale => {
	dispatch(setLocale(locale));
	localStorage.setItem(KEY_LANGUAGE_LOCAL_STORAGE, locale);
}})
 
export default connect(mapStateToProps, mapDispatchToProps)(Header)
