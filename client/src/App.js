import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './components/RegisterForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
