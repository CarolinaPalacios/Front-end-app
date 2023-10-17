import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import NoteDetail from './NoteDetail';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { store } from '../store/store';

describe('NoteDetail', () => {
  test('renders NoteDetail', async () => {
    const component = render(
      <MemoryRouter initialEntries={['/note/your-id']}>
        <Provider store={store}>
          <NoteDetail />
        </Provider>
      </MemoryRouter>
    );

    expect(component).toBeDefined();
  });
  test('clicking the button will let you edit the note', async () => {
    const component = render(
      <MemoryRouter initialEntries={['/note/your-id']}>
        <Provider store={store}>
          <NoteDetail />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      const editButton = component.getByText('Edit');
      expect(editButton).toBeDefined();
      fireEvent.click(editButton);
    });

    await waitFor(() => {
      const saveButton = component.getByText('Save');

      expect(saveButton).toBeDefined();
    });
  });
});
