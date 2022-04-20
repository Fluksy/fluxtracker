import { connect } from "react-redux";

const MexStatsView = ({translations, burnedMexAmount, mexEconomics}) => {
	return <div className="d-flex flex-column">
		<h3 className="text-center">{translations?.mex_stats}</h3>
		<hr />
		<div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
			<div className="d-flex align-items-center">
				<span className="text-center me-2">MEX-455c57</span>
				<img className="ms-2" src="https://media.elrond.com/tokens/asset/MEX-455c57/logo.svg" alt="MEX-455c57" class="token-symbol" width={20}/>
			</div>
				<span className="text-muted text-center">{`${mexEconomics.price.toFixed(8)} $`}</span>
		</div>
		<hr />
		<div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
			<span className="text-center">{`${parseInt(burnedMexAmount).toLocaleString('en')} 🔥`}</span>
			<span className="text-muted text-center">{`${(parseInt(burnedMexAmount*mexEconomics.price)).toLocaleString('en')}`} $</span>
		</div>
		<hr />
		<div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
			<span className="text-center">{`${translations?.ciculating_supply}`}</span>
			<span className="text-muted text-center">{`${(parseInt(mexEconomics.circulatingSupply)).toLocaleString('en')} (${(mexEconomics.circulatingSupply * 100 / mexEconomics.totalSupply).toFixed(2)} %)`}</span>
		</div>
		<hr />
		<div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
			<span className="text-center">{`${translations?.total_supply}`}</span>
			<span className="text-muted text-center">{`${(parseInt(mexEconomics.totalSupply)).toLocaleString('en')} (${(burnedMexAmount * 100 / mexEconomics.totalSupply).toFixed(2)} % 🔥)`}</span>
		</div>
		<hr />
	</div>
}

const mapStateToProps = ({i18n, burnedMexAmount, mexEconomics}) => ({
	translations: i18n?.translations[i18n.locale],
	burnedMexAmount,
	mexEconomics
});
export default connect(mapStateToProps)(MexStatsView);
