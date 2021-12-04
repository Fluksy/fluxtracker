import { connect } from 'react-redux';
import './Home.scss';

const Home = ({translations}) => {
	return <div className='mt-5'>
		<div className='text-center'>
			<h2>{translations.WhenShouldIRestake}</h2>
		</div>
		<div>
			<div className='form'></div>
		</div>
	</div>

}

const mapStateToProps = ({i18n}) => ({ translations: i18n?.translations[i18n.locale]?.home })
export default connect(mapStateToProps)(Home)
