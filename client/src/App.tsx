import Footer from './components/footer';
import Header from './components/header';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
