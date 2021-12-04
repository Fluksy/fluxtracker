import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { middlewares } from '../../store/index';
import { locales } from '../../locales';
import { shallow } from 'enzyme';

// Use the same middlewares you use with Redux's applyMiddleware
const mockStore = configureMockStore(middlewares);
// Setup the entire state, not just the part Redux passes to the connected component.
const mockStoreInitialized = mockStore({ 
	i18n: {
		translations: locales, 
		locale: "FR"
	}
}); 


test('renders footer', () => {

	const wrapper = shallow(
		<Provider store={mockStoreInitialized}>
			<Footer/>
		</Provider>
	);
	// expect(wrapper).toMatchSnapshot();
	
  // const madeWith = screen.getByText(`/${t()}/i`);
  // const byFluxy = screen.getByText(/par Fluxy/i);
  // expect(madeWith).toBeInTheDocument();
  // expect(byFluxy).toBeInTheDocument();
});
