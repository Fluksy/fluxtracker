import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAccount } from '../../config/api.elrond';
import { toast } from 'react-toastify';
import { setAccount } from '../../store/actions';
import { Navigate, useParams } from 'react-router-dom';

const ServiceProviderRewards = ({account, translations, setAccount}) => {
	const [needRedirect, setNeedRedirect] = useState(false)
	const { addressOrHerotag } = useParams();
	const [loading, setLoading] = useState();

	useEffect(() => {
		const searchAccountInfo = async () => {
			if (!!addressOrHerotag) {
				try {
					const { data: account } = await getAccount(addressOrHerotag);
					setAccount(account);
		
				} catch (error) {
					toast.error(translations.bad_address_or_herotag, {theme: 'dark', position: toast.POSITION.BOTTOM_RIGHT})
					setNeedRedirect(true);
				}
			}
		}
		searchAccountInfo();
	}, [addressOrHerotag] )


	return <div>
		{needRedirect && <Navigate to={'/search'}/>}
		{loading ? <div>loading... </div> : <div>herotag : {account?.username}</div>}
	</div>
}

const mapStateToProps = ({i18n, account}) => ({ translations: i18n?.translations[i18n.locale], account});
const mapDispatchToProps = dispatch => ({setAccount : account => {dispatch(setAccount(account))}})
export default connect(mapStateToProps, mapDispatchToProps)(ServiceProviderRewards)
