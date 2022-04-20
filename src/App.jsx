import { Search, Header, Footer, ServiceProviderRewards, MexStatsView} from './components';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.scss';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import { fetchBurnedMexAmount, fetchEgldPrice, fetchMexEconomics } from './store/actions';
import { useEffect } from 'react';

function App({onFetchEgldPrice, onFetchBurnedMexAmount, onFetchMexEconomics}) {

	useEffect(() => {
		onFetchEgldPrice();
		const interval = setInterval(() => {
			onFetchEgldPrice();
		}, 30000);
		return () => clearInterval(interval);
	}, [onFetchEgldPrice])

	useEffect(() => {
		onFetchBurnedMexAmount();
		onFetchMexEconomics();
		const interval = setInterval(() => {
			onFetchBurnedMexAmount();
			onFetchMexEconomics();
		}, 10000);
		return () => clearInterval(interval);
	}, [onFetchBurnedMexAmount, onFetchMexEconomics]);

  return <Router>
		<div className='App d-flex flex-column min-vh-100' theme={'dark'}>
			<Header />
			<div className="main-content flex-grow-1 container my-4">
				<Routes>
					<Route path='/search' exact element={<Search/>}></Route>
					<Route path='/rewards/:addressOrHerotag' exact element={<ServiceProviderRewards/>}></Route>
					<Route path='/mex-stats' exact element={<MexStatsView/>}></Route>
					<Route path='*' element={<Navigate to="/search" /> } />
				</Routes>
				<ToastContainer />
			</div>
			<Footer />
  	</div>
	</Router>
}

const mapDispatchToProps = dispatch => ({
	onFetchEgldPrice : () => dispatch(fetchEgldPrice()), 
	onFetchBurnedMexAmount: () => dispatch(fetchBurnedMexAmount()),
	onFetchMexEconomics: () => dispatch(fetchMexEconomics()),
});
export default connect(null, mapDispatchToProps)(App);
