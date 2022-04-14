import './Header.scss';
import { ElrondLogo } from '../';
import ReactFlagsSelect from 'react-flags-select';
import { locales } from '../../locales';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLocale } from 'react-redux-i18n';
import { KEY_LANGUAGE_LOCAL_STORAGE } from '../../locales'

import { Button, Container, Form, FormControl, Navbar, NavDropdown, Offcanvas, Nav} from 'react-bootstrap';


const Header = ({ setLocale, locale }) => {
	return <Navbar className='bg-navbar' expand={false}>
		<Container fluid>
			<Link to='/search' className="d-flex rounded p-2 align-items-center navbar-brand maiar-shadow">
				<ElrondLogo />
				<span className="p-0 ps-sm-3 text-secondary text-truncate">Fluxtracker</span>
			</Link>
			<div className='d-flex'>
				<ReactFlagsSelect
					className='pb-0'
					countries={Object.keys(locales)}
					showOptionLabel={false}
					showSelectedLabel={false}
					selected={locale}
					style={{ backgroundColor: '#18191a' }}
					onSelect={(code) => setLocale(code)}
				/>
				<Navbar.Toggle aria-controls="offcanvasNavbar" className='ms-2' />
			</div>
			<Navbar.Offcanvas
				id="offcanvasNavbar"
				aria-labelledby="offcanvasNavbarLabel"
				placement="end"
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title id="offcanvasNavbarLabel">Fluxtracker</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					{/* <Nav className="justify-content-end flex-grow-1 pe-3">
						<Nav.Link href="#action1">Home</Nav.Link>
						<Nav.Link href="#action2">Link</Nav.Link>
						<NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
							<NavDropdown.Item href="#action3">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action5">
								Something else here
							</NavDropdown.Item>
						</NavDropdown>
					</Nav> */}
				</Offcanvas.Body>
			</Navbar.Offcanvas>
		</Container>
	</Navbar>
}

const mapStateToProps = ({i18n}) => ({locale : i18n.locale})
const mapDispatchToProps = dispatch => ({setLocale : locale => {
	dispatch(setLocale(locale));
	localStorage.setItem(KEY_LANGUAGE_LOCAL_STORAGE, locale);
}})
 
export default connect(mapStateToProps, mapDispatchToProps)(Header)
