import { Search, Header, Footer, ServiceProviderRewards} from './components';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.scss';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {

  return <Router>
		<div className='App d-flex flex-column min-vh-100' theme={'dark'}>
			<Header />
			<div className="main-content flex-grow-1 container">
				<Routes>
					<Route path='/search' exact element={<Search/>}></Route>
					<Route path='/rewards/:addressOrHerotag' exact element={<ServiceProviderRewards/>}></Route>
					<Route path='*' element={<Navigate to="/search" /> } />
				</Routes>
				<ToastContainer />
			</div>
			<Footer />
  	</div>
	</Router>
}

export default App;
