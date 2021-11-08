import './Footer.scss';
import { useTranslation } from 'react-i18next';
import { HeartIcon } from '../CustomIcons';

export const Footer = () => {
	const { t } = useTranslation();

	return <div className="Footer d-flex justify-content-center align-items-center">
		{ t('footer.madeWith') }
			<HeartIcon style={{height: '1em'}}/>
		{ t('footer.byFluxy') }
	</div>
}
