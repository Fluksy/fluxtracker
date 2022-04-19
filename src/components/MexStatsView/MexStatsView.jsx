import { connect } from "react-redux";

const MexStatsView = ({burnedMexAmount}) => <div className="d-flex justify-content-center"><h1>{`${parseInt(burnedMexAmount).toLocaleString('en')} mex burned 🔥`}</h1></div>

const mapStateToProps = ({burnedMexAmount}) => ({
	burnedMexAmount
});
export default connect(mapStateToProps)(MexStatsView);
