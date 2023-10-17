import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import NoteCard from './NoteCard';
import { store } from '../store/store';
import { note } from './utils/test_utils';

describe('NoteCard', () => {
  test('renders NoteCard', () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NoteCard note={note} />
        </BrowserRouter>
      </Provider>
    );
    const element = component.getByText(note.title);
    expect(element).toBeDefined();

    const li = component.container.querySelector('li');
    expect(li).not.toBeNull();
  });
  test('clicking the button will navigate to the note', async () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NoteCard note={note} />
        </BrowserRouter>
      </Provider>
    );
    const button = component.getByText('See more');
    fireEvent.click(button);

    await waitFor(() => {
      expect(window.location.href).toContain(`/note/${note.id}`);
    });
  });
});
