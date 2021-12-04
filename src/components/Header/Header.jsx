import './Header.scss';
import { ElrondLogo } from '../CustomIcons';
import ReactFlagsSelect from 'react-flags-select';
import { locales } from '../../locales';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLocale } from 'react-redux-i18n';

const Header = ({ setLocale, locale }) => {
	return <div className="Header sticky-top">
		<nav className="navbar align-items-stretch flex-nowrap px-0">
			<div className="d-flex align-items-center ms-0 ms-sm-5">
				<Link to='/' className="d-flex align-items-center navbar-brand">
					<ElrondLogo />
					<span className="text-secondary text-truncate">Fluxtracker</span>
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
const mapDispatchToProps = dispatch => ({setLocale : locale => dispatch(setLocale(locale))})
 
export default connect(mapStateToProps, mapDispatchToProps)(Header)
