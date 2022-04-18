import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Search.scss';
import { SimpleElrondLogo} from '../CustomIcons/ElrondLogo/ElrondLogo'
import { FaSearch } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { addToSearchHistory, removeFromSearchHistory, setAccount, setProviders } from '../../store/actions';
import { Navigate, NavLink } from 'react-router-dom';
import { getAccount } from '../../config/api.elrond';
import { toast } from 'react-toastify';
import { Button, Card } from 'react-bootstrap';
import { CardFooter, CardHeader, CardTitle } from 'reactstrap';
import { LOGO_FONT_SIZE } from '../../config/constants';

const Search = ({translations, setAccount, setProviders, searchHistory, addToSearchHistory, removeFromSearchHistory}) => {
	const inputHeight = 48;
	const elrondLogoFontSize = 24;
	const [value, setValue] = useState('')
	const [loading, setLoading] = useState(false)
	const [redirect, setRedirect] = useState(false)

	useEffect(() => {
		setAccount(null);
		setProviders([]);
	} , [setAccount, setProviders])
	
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
			addToSearchHistory(value);
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
			<div className='d-flex flex-column flex-grow-1 my-5'>
				<div className='text-center my-3'>
					<h2 className='mb-0'>{translations?.when_should_i_restake}</h2>
				</div>
				<div className='d-flex flex-column flex-lg-row my-5' style={{gap: '1em'}}>
					<div className='form flex-grow-1'>
						<div className="form-group">
							<input onKeyDown={handleKeyDown} value={value} onChange={({target : { value }}) => setValue(value)} type="text" name="egld address" className="form-style maiar-shadow text-truncate" placeholder={translations?.write_here_your_egld_address_or_herotag} autoComplete="off" />
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
				{searchHistory.length > 0 && <div className='search-history d-flex flex-column justify-content-center'>
						<Card className="custom-card card border-card place-self-center">
							<CardHeader className='d-flex justify-content-center align-items-center'>
								<CardTitle>{translations?.recent_searches}</CardTitle>
							</CardHeader>
							{searchHistory.map((search, index) => {
									return <div key={search} className='d-grid' style={{ gridTemplateColumns: '9fr 1fr' }}>
										<NavLink to={`/rewards/${search}`}  key={index} className='text-center'>
											{index === searchHistory.length-1 ? 
												<CardFooter className='d-flex justify-content-center align-items-center' style={{height: '100%'}}>
													<CardTitle style={{ wordBreak: 'break-word' }}>{search}</CardTitle>
												</CardFooter> :
												<CardHeader className='d-flex justify-content-center align-items-center' style={{height: '100%'}}>
													<CardTitle style={{ wordBreak: 'break-word' }}>{search}</CardTitle>
												</CardHeader>
											}
										</NavLink>
										{index === searchHistory.length-1?
											<CardFooter className='d-flex justify-content-center align-items-center'><Button onClick={() => removeFromSearchHistory(search)} className='p-2 remove'><AiFillCloseCircle size={LOGO_FONT_SIZE}/></Button></CardFooter> :
											<CardHeader className='d-flex justify-content-center align-items-center'><Button onClick={() => removeFromSearchHistory(search)} className='p-2 remove'><AiFillCloseCircle size={LOGO_FONT_SIZE}/></Button></CardHeader>}
									</div>
							})}
						</Card>
				</div>}
			</div>
		}
	</>
}

const mapStateToProps = ({i18n, account, searchHistory}) => ({ translations: i18n?.translations[i18n.locale], account, searchHistory });
const mapDispatchToProps = dispatch => ({
	setAccount : account => {dispatch(setAccount(account))},
	setProviders : providers => {dispatch(setProviders(providers))},
	addToSearchHistory : search => {dispatch(addToSearchHistory(search))},
	removeFromSearchHistory : search => {dispatch(removeFromSearchHistory(search))}

});
export default connect(mapStateToProps, mapDispatchToProps)(Search)
