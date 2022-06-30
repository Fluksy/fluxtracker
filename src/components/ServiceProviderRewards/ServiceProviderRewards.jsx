import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAccount } from '../../config/api.elrond';
import { getProviders } from '../../config/api.fluxtracker';
import { toast } from 'react-toastify';
import { setAccount, setProviders } from '../../store/actions';
import { Navigate, useParams } from 'react-router-dom';
import { ServiceProviderCard } from "../";
import { Loader } from '../index';

const ServiceProviderRewards = ({account, providers, translations, setAccount, setProviders}) => {
	const [needRedirect, setNeedRedirect] = useState(false)
	const { addressOrHerotag } = useParams();
	const [loading, setLoading] = useState(false);
	
	useEffect(() => {
		(async () => {
			if (!!addressOrHerotag) {
				try {
					setLoading(true);
					const { data: account } = await getAccount(addressOrHerotag);
					setAccount(account);
				} catch (error) {
					toast.error(translations?.bad_address_or_herotag, {theme: 'dark', position: toast.POSITION.BOTTOM_RIGHT})
					setNeedRedirect(true);
					setLoading(false);
				}
			}
		})()
	}, [addressOrHerotag, translations?.bad_address_or_herotag, setAccount])

	useEffect(() => {

		(async () => {
			if (!!account) { 
				const { data: providers } = await getProviders(account?.address);
				setProviders(providers);
				setLoading(false);
			}
		})()

	}, [account, setProviders])
	
	return <>
		{needRedirect && <Navigate to={'/search'}/>}
		{ loading && <Loader />}
		{ !loading && providers?.length > 0 && <div className="d-grid" style={{gap:'1.5rem'}}>
			{ providers.map(provider => {
				return <ServiceProviderCard key={provider.contract} {...provider}/>
			})}
		</div> }
		{ providers?.length === 0 && !loading && <h1 className="text-center p-5">{translations?.no_staking_providers_found}</h1>}
	</>
}

const mapStateToProps = ({i18n, account, providers}) => ({ 
	translations: i18n?.translations[i18n.locale],
	account,
	providers
});
const mapDispatchToProps = dispatch => ({
	setAccount : account => {dispatch(setAccount(account))},
	setProviders : providers => {dispatch(setProviders(providers))}
})
export default connect(mapStateToProps, mapDispatchToProps)(ServiceProviderRewards)
