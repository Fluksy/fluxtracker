import { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaTwitter } from "react-icons/fa";
import { Card, CardBody, CardFooter, CardHeader, CardImg, CardText, CardTitle } from "reactstrap";
import { getProviderInfos } from "../../config/api.fluxtracker";
import './ServiceProviderCard.scss';

const ServiceProviderCard = (props) => {

	const [provider, setProvider] = useState();
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const { data } = await getProviderInfos(props.contract);
			setProvider(data);
			setLoading(false);
		}
		fetchData();
	}, [props.contract])

	return (
		<Card className="custom-card card border-card">
			{loading && !provider ?
				<div>Loading...</div> :
				<>
					<CardHeader className="d-flex align-items-center">
						<CardImg src={provider?.identity?.avatar}></CardImg>
						<CardTitle className="flex-grow-1 text-center"><h5>{provider?.identity.name}</h5></CardTitle>
					</CardHeader>
					<CardBody>
						<CardText>{provider?.identity.description}</CardText>
					</CardBody>
					<CardFooter>
						{!!provider?.identity.url && <a href={provider?.identity.url} target='_blank' rel="noreferrer" className="p-1"><FaExternalLinkAlt></FaExternalLinkAlt></a>}
						{!!provider?.identity.twitter && <a href={provider?.identity.twitter} target='_blank' rel="noreferrer"><FaTwitter></FaTwitter></a>}
					</CardFooter>
				</>

			}
		</Card>
	)
}

export default ServiceProviderCard;
