import { useEffect, useState } from "react";
import { FaTwitter, FaGithub, FaLink, FaServer, FaPercent } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { Card, CardBody, CardFooter, CardHeader, CardImg, CardText, CardTitle } from "reactstrap";
import { getProviderInfos } from "../../config/api.fluxtracker";
import ReactTooltip from 'react-tooltip';
import './ServiceProviderCard.scss';
import { connect } from "react-redux";

const LOGO_FONT_SIZE = 22;

const ServiceProviderCard = ({contract, translations}) => {

	const [provider, setProvider] = useState();
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const { data } = await getProviderInfos(contract);
			setProvider(data);
			setLoading(false);
		}
		fetchData();
	}, [contract])

	return (
		<Card className="custom-card card border-card place-self-center">
			{loading && !provider ?
				<div>Loading...</div> :
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
					</CardBody>
					<CardFooter className="d-flex align-items-center justify-content-between flex-wrap" style={{gap: '.5em'}}>
						<div className="d-flex align-items-center" style={{gap: '.5em'}}>
							{!!provider?.numNodes && 
								<div data-tip={`${translations?.node_count} : ${provider?.numNodes}`} className="d-flex align-items-center" style={{gap: '.3em'}}>
									<span>{`${provider?.numNodes}`}</span>
									<FaServer className='primary-color' size={LOGO_FONT_SIZE}/>
								</div>
							}
							{!!provider?.apr && 
								<div data-tip={`${provider?.apr}% ${translations?.apr}`} className="d-flex align-items-center" style={{gap: '.3em'}}>
									<span>{`${provider?.apr}`}</span>
									<FaPercent className='primary-color' size={LOGO_FONT_SIZE}/>
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
