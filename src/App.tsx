import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import NoteDetail from './components/NoteDetail';
import { useGetLocalStorage } from './components/hook/useLocalStorage';

import './App.css';

const App = () => {
  useGetLocalStorage();
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/note/:id' element={<NoteDetail />} />
    </Routes>
  );
};

export default App;
