import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAccount, getProviders, getProviderInfos } from '../../config/api.elrond';
import { toast } from 'react-toastify';
import { setAccount } from '../../store/actions';
import { Navigate, useParams } from 'react-router-dom';

const ServiceProviderRewards = ({account, translations, setAccount}) => {
	const [needRedirect, setNeedRedirect] = useState(false)
	const { addressOrHerotag } = useParams();
	const [loading, setLoading] = useState();

	useEffect(() => {
		(async () => {
			if (!!addressOrHerotag && !account) {
				try {
					setLoading(true);
					const { data: account } = await getAccount(addressOrHerotag);
					setAccount(account);
					setLoading(false);
				} catch (error) {
					toast.error(translations?.bad_address_or_herotag, {theme: 'dark', position: toast.POSITION.BOTTOM_RIGHT})
					setNeedRedirect(true);
					setLoading(false);
				}
			}
		})()
	}, [addressOrHerotag])

	useEffect(() => {

		(async () => {
			if (!!account) { 
				const { data: providers } = await getProviders(account.address);
				console.log('providers', providers);
				providers.forEach(async provider => {
					const { data: infos } = await getProviderInfos(provider.contract);
					console.log('infos', infos);
				})
			}
		})()

	}, [account])

	

	return <div>
		{needRedirect && <Navigate to={'/search'}/>}
		{loading ? <div>loading... </div> : <div>herotag : {account?.username}</div>}
	</div>
}

const mapStateToProps = ({i18n, account}) => ({ translations: i18n?.translations[i18n.locale], account});
const mapDispatchToProps = dispatch => ({setAccount : account => {dispatch(setAccount(account))}})
export default connect(mapStateToProps, mapDispatchToProps)(ServiceProviderRewards)
