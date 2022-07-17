import './Footer.scss';
import { HeartIcon } from '../index';
import { connect } from 'react-redux';

const Footer = ({translations}) => {
	return <div className="Footer d-flex justify-content-center align-items-center flex-column py-3" style={{gap: '5px'}}>
		<iframe className='m-auto' title='egld-community' src='https://egld.community/api/products/8cd9d4b3-6ede-4d8a-8a7d-4872506592c3/upvotes/embed' style={{borderRadius: "8px", border: 'none', width: '290px', height: '70px'}}></iframe>
		<label>
			{translations?.made_with}
				<HeartIcon style={{height: '1em'}}/>
			{`${translations?.by} ${translations?.fluxy}`}
		</label>
		<label>
			{ translations?.not_affiliated }
		</label>
	</div>
}

const mapStateToProps = ({i18n}) => ({ translations: i18n?.translations[i18n.locale] })
export default connect(mapStateToProps)(Footer)
