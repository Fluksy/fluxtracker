import { useEffect, useState, useMemo } from "react";
import { FaTwitter, FaGithub, FaLink, FaServer, FaUsers } from "react-icons/fa";
import { RiPercentLine } from "react-icons/ri";
import { GoVerified } from "react-icons/go";
import { Card, CardBody, CardFooter, CardHeader, CardImg, CardText, CardTitle } from "reactstrap";
import { getProviderInfos } from "../../config/api.fluxtracker";
import ReactTooltip from 'react-tooltip';
import './ServiceProviderCard.scss';
import { connect } from "react-redux";
import { Loader } from '../index';
import { convertToReadableEgldAmount } from "../../utils/converter";
import { LOGO_FONT_SIZE } from "../../config/constants";
import { SimpleElrondLogo } from '../CustomIcons/ElrondLogo/ElrondLogo';
import { AiOutlineInfoCircle } from "react-icons/ai";

const ServiceProviderCard = ({contract, translations, claimableRewards, userActiveStake, userUnBondable, egldPrice}) => {

	const [provider, setProvider] = useState();
	const [loading, setLoading] = useState(false)
	// const [fees, setFees] = useState(0.0001355);
	const fees = 0.0001355;
	// const [period, setPeriod] = useState(365)
	const period = 365;
	const [apr, setAPR] = useState(0.00);
	// const [stakedTokens, setStakedTokens] = useState(userActiveStake);
	const stakedTokens = userActiveStake;

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const { data } = await getProviderInfos(contract);
			setProvider(data);
			const { aprValue } = data;
			setAPR(aprValue);
			setLoading(false);
		}
		fetchData();
	}, [contract])

	const estimatedNumberOfDays = useMemo(() => {
		const delegatedTokens = convertToReadableEgldAmount(stakedTokens);
		if (delegatedTokens < 1) {
			return 0;
		}
		const dailyReward = (apr/100) / 365;
		return Math.round(Math.sqrt(fees * (period * dailyReward + 2) / Math.pow(dailyReward, 2) / delegatedTokens));
	}, [fees, apr, period, stakedTokens])

	const amountBeforeClaim = useMemo(() => {
		if (stakedTokens < 1) {
			return 0;
		}
		const dailyReward = stakedTokens * (apr/100) / 365;
		return estimatedNumberOfDays * dailyReward;
	}, [stakedTokens, apr, estimatedNumberOfDays])

	const leftAmountToAccumulate = useMemo(() => {
		if (claimableRewards >= amountBeforeClaim) {
			return 0;
		}
	
		return Number(amountBeforeClaim)-Number(claimableRewards);
	}, [amountBeforeClaim,claimableRewards])

	return (
		<Card className={`custom-card card border-card place-self-center${leftAmountToAccumulate <= 0 ? " can-claim-egld" : ""}`}>
			{loading && !provider ?
				<Loader /> :
				<>
					<ReactTooltip clickable={true} border place="top" effect="solid" type="dark" />	
					<CardHeader className="d-flex align-items-center">
						<CardImg src={provider?.identity?.avatar}></CardImg>
						<CardTitle className="flex-grow-1 text-center">
							<span>{provider?.identity?.name}</span>
						</CardTitle>
						{!!provider?.featured && <div data-tip={translations?.featured} className="p-2 d-flex"><GoVerified className='primary-color' size={LOGO_FONT_SIZE} /></div>}
					</CardHeader>
					<CardBody className="d-flex flex-column justify-content-center align-items-center" style={{ gap: '1em'}}>
						<CardText className="d-flex align-items-center justify-content-center" style={{gap: '.5em'}}>
							<span className="font-weight-bold">{`${translations?.staked_amount} : `} <strong>{convertToReadableEgldAmount(userActiveStake, 2)}</strong></span>
							{' '}
							<SimpleElrondLogo
								style={{
									height: `1em`,
									fill: 'white',
									WebkitTransition: 'all 200ms linear',
									transition: 'all 200ms linear'
								}}
							/>
							<span>(<strong>{`${(egldPrice*convertToReadableEgldAmount(userActiveStake)).toFixed(2)}$`}</strong>)</span>
						</CardText>
						<CardText className="d-flex align-items-center justify-content-center" style={{gap: '.5em'}}>
							<span>{`${translations?.claimable_rewards} : `} <strong>{convertToReadableEgldAmount(claimableRewards)}</strong> </span>
							{' '}
							<SimpleElrondLogo
								style={{
									height: `1em`,
									fill: 'white',
									WebkitTransition: 'all 200ms linear',
									transition: 'all 200ms linear'
								}}
							/>
							<span>(<strong>{`${(egldPrice*convertToReadableEgldAmount(claimableRewards)).toFixed(2)}$`}</strong>)</span>
						</CardText>
							{leftAmountToAccumulate !== 0 ? <div data-tip={translations?.amount_to_wait_explained} className="d-flex justify-content-center align-items-center" style={{gap: ".5em"}}>
								<AiOutlineInfoCircle className="primary-color" size={LOGO_FONT_SIZE} />
								<CardText className="bold">
									{`${translations?.amount_to_wait_for_next_restake_with_left_amount.replace('{amount}', convertToReadableEgldAmount(amountBeforeClaim)).replace('{left_amount}', convertToReadableEgldAmount(leftAmountToAccumulate))}`}
								</CardText>
								</div> :
								<CardText data-tip={translations?.amount_to_wait_explained}>
									<strong>{`${translations?.you_can_restake_your_staking_rewards}`}</strong>
								</CardText>
							}
						<CardText className="smaller-text">{`${translations?.estimated_days.replace('{days}', estimatedNumberOfDays)}`}</CardText>
					</CardBody>
					<CardFooter className="d-flex align-items-center justify-content-between flex-wrap" style={{gap: '.5em'}}>
						<div className="d-flex align-items-center" style={{gap: '.5em'}}>
							{!!provider?.apr && 
								<div data-tip={translations?.apr} className="d-flex align-items-end" style={{gap: '.3em'}}>
									<span>{`${provider?.apr}`}</span>
									<RiPercentLine className='primary-color' size={LOGO_FONT_SIZE}/>
								</div>
							}
							{!!provider?.numUsers && 
								<div data-tip={`${translations?.staking_user_count}`} className="d-flex align-items-end" style={{gap: '.3em'}}>
									<span>{`${provider?.numUsers}`}</span>
									<FaUsers className='primary-color' size={LOGO_FONT_SIZE}/>
								</div>
							}
							{!!provider?.numNodes && 
								<div data-tip={`${translations?.node_count}`} className="d-flex align-items-end" style={{gap: '.3em'}}>
									<span>{`${provider?.numNodes}`}</span>
									<FaServer className='primary-color' size={LOGO_FONT_SIZE}/>
								</div>
							}
						</div>
						<div className="d-flex">
							{!!provider?.identity?.url && <a data-tip={translations?.website} className="p-2 d-flex" href={provider?.identity?.url} target='_blank' rel="noopener noreferrer"><FaLink size={LOGO_FONT_SIZE} /></a>}
							{!!provider?.identity.github && <a data-tip={`Github`} className="p-2 d-flex" href={provider?.identity.github} target='_blank' rel="noopener noreferrer"><FaGithub size={LOGO_FONT_SIZE} /></a>}
							{!!provider?.identity.twitter && <a data-tip={`Twitter`} className="p-2 d-flex" href={provider?.identity.twitter} target='_blank' rel="noopener noreferrer"><FaTwitter size={LOGO_FONT_SIZE} /></a>}
						</div>
					</CardFooter>
				</>

			}
		</Card>
	)
}

const mapStateToProps = ({i18n, egldPrice}) => ({ translations: i18n?.translations[i18n.locale], egldPrice})
export default connect(mapStateToProps)(ServiceProviderCard);
