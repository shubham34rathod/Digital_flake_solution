// import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './component/Login';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import Home from './component/Home';
import Category from './component/Category';
import Addcategory from './component/Addcategory';
import Product from './component/Product';
import Addproduct from './component/Addproduct';
import Forgot_password from './component/Forgot_password';

function App() {
  return <>
    {/* <Login></Login> */}
    {/* <Navbar></Navbar> */}

    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/forgot_password/:id/:token' element={<Forgot_password></Forgot_password>}></Route>
          <Route path='/navbar/' element={<Navbar></Navbar>}>
            <Route path='sidebar' element={<Sidebar></Sidebar>}></Route>
            <Route path='home' element={<Home></Home>}></Route>
            <Route path='category' element={<Category></Category>}></Route>
            <Route path='add_category' element={<Addcategory></Addcategory>}></Route>
            <Route path='product' element={<Product></Product>}></Route>
            <Route path='add_product' element={<Addproduct></Addproduct>}></Route>
          </Route>
        </Routes>
    </BrowserRouter>
  </>
}

export default App;
