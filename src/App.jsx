import './App.scss';
import { Home } from './components/Home/Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return <div className='d-flex flex-column min-vh-100'>
		<Header />
    <Home></Home>
    <Footer />
  </div>
}

export default App;
