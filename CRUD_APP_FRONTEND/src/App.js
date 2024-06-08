
import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Nopage from './pages/nopage';
import { UserProvider } from './UserContext';


//top Route is just so that it defaults to login.
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Login/>}/>

          <Route path="login" element={<Login/>}/>
          <Route path="home" element={<Home/>}/>
          <Route path="*" element={<Nopage/>}/>

        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
