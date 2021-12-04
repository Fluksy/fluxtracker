import './Footer.scss';
import { HeartIcon } from '../CustomIcons';
import { connect } from 'react-redux';

const Footer = ({translations}) => {
	return <div className="Footer d-flex justify-content-center align-items-center flex-column py-3">
		<label>
			{ translations.madeWith }
				<HeartIcon style={{height: '1em'}}/>
			{ translations.byFluxy }
		</label>
		<label>
			{ translations.notAffiliated }
		</label>
	</div>
}

const mapStateToProps = ({i18n}) => ({ translations: i18n?.translations[i18n.locale]?.footer })
export default connect(mapStateToProps)(Footer)
