import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/RegisterForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>} ></Route>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
