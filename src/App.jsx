import { Home } from './components/Home/Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.scss';

function App() {

  return <div className='d-flex flex-column min-vh-100'>
		<Header />
    <div className="main-content flex-grow-1">
			<Home></Home>
		</div>
    <Footer />
  </div>
}

export default App;
