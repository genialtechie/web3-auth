import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './components/RegisterForm';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
