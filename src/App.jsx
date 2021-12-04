import { Home } from './components/Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return <Router>
		<div className='App d-flex flex-column min-vh-100' theme={'dark'}>
			<Header />
			<div className="main-content flex-grow-1 container">
				<Routes>
					<Route path='/' exact element={<Home/>}></Route>
					<Route path='/:address/rewards' exact element={<Home/>}></Route>
					<Route path='*' element={<Home/>} />
				</Routes>
			</div>
			<Footer />
  	</div>
	</Router>
}

export default App;
