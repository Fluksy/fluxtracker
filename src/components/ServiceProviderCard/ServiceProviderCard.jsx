import { useEffect, useState } from "react";
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

const LOGO_FONT_SIZE = 22;

const ServiceProviderCard = ({contract, translations, claimableRewards, userActiveStake, userUnBondable}) => {

	const [provider, setProvider] = useState();
	const [loading, setLoading] = useState(false)
	const [fees, setFees] = useState(0.0001355);
	const [period, setPeriod] = useState(365)
	const [apr, setAPR] = useState(0.00);
	const [stakedTokens, setStakedTokens] = useState(userActiveStake);

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

	const numberOfdays = (fees, apr, stakingPeriodInDays, delegatedTokens) => {
		if (delegatedTokens < 1) {
			return 0;
		}
		const dailyReward = (apr/100) / 365;
		return Math.round(Math.sqrt(fees * (stakingPeriodInDays * dailyReward + 2) / Math.pow(dailyReward, 2) / delegatedTokens));
	}

	const amountBeforeClaim = (delegatedTokens, apr, numberOfDay) => {
		if (delegatedTokens < 1) {
				return 0;
		}
		const dailyReward = delegatedTokens * (apr/100) / 365;
		return numberOfDay * dailyReward;
	}

	return (
		<Card className="custom-card card border-card place-self-center">
			{loading && !provider ?
				<Loader /> :
				<>
					<ReactTooltip clickable={true} border />	
					<CardHeader className="d-flex align-items-center">
						<CardImg src={provider?.identity?.avatar}></CardImg>
						<CardTitle className="flex-grow-1 text-center">
							<span>{provider?.identity?.name}</span>
						</CardTitle>
						{!!provider?.featured && <div data-tip={translations?.featured} className="p-2 d-flex"><GoVerified className='primary-color' size={LOGO_FONT_SIZE} /></div>}
					</CardHeader>
					<CardBody>
						<CardText>{provider?.identity.description}</CardText>
						<CardText>{`Claimable rewards : ${convertToReadableEgldAmount(claimableRewards)} EGLD`}</CardText>
						<CardText>{`userActiveStake : ${convertToReadableEgldAmount(userActiveStake)}`}</CardText>
						<CardText>{`userUnBondable : ${convertToReadableEgldAmount(userUnBondable)}`}</CardText>
						<CardText>{`Every  ${numberOfdays(fees, apr, period, convertToReadableEgldAmount(stakedTokens))} days`}</CardText>
						<CardText>{`wait  ${convertToReadableEgldAmount(amountBeforeClaim(stakedTokens, apr, numberOfdays(fees, apr, period, convertToReadableEgldAmount(stakedTokens))))} before claim.`}</CardText>
					</CardBody>
					<CardFooter className="d-flex align-items-center justify-content-between flex-wrap" style={{gap: '.5em'}}>
						<div className="d-flex align-items-center" style={{gap: '.5em'}}>
							{!!provider?.apr && 
								<div data-tip={translations?.apr} className="d-flex align-items-center" style={{gap: '.3em'}}>
									<span>{`${provider?.apr}`}</span>
									<RiPercentLine className='primary-color' size={LOGO_FONT_SIZE}/>
								</div>
							}
							{!!provider?.numUsers && 
								<div data-tip={`${translations?.staking_user_count}`} className="d-flex align-items-center" style={{gap: '.3em'}}>
									<span>{`${provider?.numUsers}`}</span>
									<FaUsers className='primary-color' size={LOGO_FONT_SIZE}/>
								</div>
							}
							{!!provider?.numNodes && 
								<div data-tip={`${translations?.node_count}`} className="d-flex align-items-center" style={{gap: '.3em'}}>
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

const mapStateToProps = ({i18n}) => ({ translations: i18n?.translations[i18n.locale] })
export default connect(mapStateToProps)(ServiceProviderCard);
