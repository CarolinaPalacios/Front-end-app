import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Home from './Home';

describe('Home', () => {
  test('renders Home', () => {
    const component = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    component.getByText('Notes');
    // expect(screen.getByText('Notes')).toBeDefined();
  });
});
