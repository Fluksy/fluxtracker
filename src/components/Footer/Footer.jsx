import './Footer.scss';
import { HeartIcon } from '../index';
import { connect } from 'react-redux';

const Footer = ({translations}) => {
	return <div className="Footer d-flex justify-content-center align-items-center flex-column py-3">
		<label>
			{translations.made_with}
				<HeartIcon style={{height: '1em'}}/>
			{`${translations.by} ${translations.fluxy}`}
		</label>
		<label>
			{ translations.not_affiliated }
		</label>
	</div>
}

const mapStateToProps = ({i18n}) => ({ translations: i18n?.translations[i18n.locale] })
export default connect(mapStateToProps)(Footer)
