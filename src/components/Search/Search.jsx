import { useState } from 'react';
import { connect } from 'react-redux';
import './Search.scss';
import { SimpleElrondLogo} from '../CustomIcons/ElrondLogo/ElrondLogo'
import { FaSearch } from 'react-icons/fa';
import { setAccount } from '../../store/actions';
import { Navigate } from 'react-router-dom';
import { getAccount } from '../../config/api.elrond';
import { toast } from 'react-toastify';

const Search = ({translations, setAccount}) => {
	const inputHeight = 48;
	const elrondLogoFontSize = 24;
	const [value, setValue] = useState('')
	const [loading, setLoading] = useState(false)
	const [redirect, setRedirect] = useState(false)
	
	const handleKeyDown = ({keyCode}) => {
		if (keyCode === 13)
			handleSearch()
	}

	const handleSearch = async () => {
		if (!value || loading) return
			
		try {
			setLoading(true);
			const { data: account } = await getAccount(value);
			setAccount(account);
			setLoading(false);
			setRedirect(true);
		} catch (error) {
			toast.error(translations.bad_address_or_herotag, {theme: 'dark', position: toast.POSITION.BOTTOM_RIGHT})
			setLoading(false);
			setRedirect(false);
		}
	}

	return <>
		{ !!redirect ?
			<Navigate to={`/rewards/${value}`}/> :
			<>
				<div className='text-center my-5'>
					<h2 className='mb-0'>{translations?.when_should_i_restake}</h2>
				</div>
				<div className='d-flex flex-column flex-lg-row' style={{gap: '1em'}}>
					<div className='form flex-grow-1'>
						<div className="form-group">
							<input onKeyDown={handleKeyDown} value={value} onChange={({target : { value }}) => setValue(value)} type="text" name="egld address" className="form-style maiar-shadow" placeholder={translations?.write_here_your_egld_address_or_herotag} autoComplete="off" />
							<SimpleElrondLogo
								style={{
									'position': 'absolute',
									'top': `${(inputHeight-elrondLogoFontSize)/2}px`,
									'left': `${(inputHeight-elrondLogoFontSize)/2}px`,
									'height': `${(elrondLogoFontSize)}px`,
									fill: 'white',
									WebkitTransition: 'all 200ms linear',
									'transition': 'all 200ms linear'
								}}
							/>
						</div>	
					</div>
					<button onClick={handleSearch} disabled={!value || loading} style={{height: `${inputHeight}px`}} className='btn d-none d-lg-flex maiar-shadow'><FaSearch size={24}/></button>
					<button onClick={handleSearch} disabled={!value || loading} style={{height: `${inputHeight}px`}} className='btn d-lg-none maiar-shadow'>{translations?.track_my_rewards}</button>
				</div>
			</>
		}
	</>
}

const mapStateToProps = ({i18n, account}) => ({ translations: i18n?.translations[i18n.locale], account});
const mapDispatchToProps = dispatch => ({setAccount : account => {dispatch(setAccount(account))}})
export default connect(mapStateToProps, mapDispatchToProps)(Search)
