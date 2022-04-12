import './Loader.scss';
import { ImSpinner6 } from 'react-icons/im';

const Loader = () => {
	return <div className="d-flex justify-content-center p-5 spinning"><ImSpinner6 size={36}></ImSpinner6></div>
}

export default Loader;
