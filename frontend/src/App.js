import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { Book } from './pages/book/Book';
import { Books } from './pages/books/Books';
import { Register } from './pages/register/Register';
import { Login } from './pages/login/Login';
import { Favourites } from './pages/favourites/Favourites';
import './app.css'



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Books />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/:id' element={<Book />} />
          <Route path='/favourites'element={<Favourites/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
