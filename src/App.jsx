import './App.scss'
import {Routes, Route} from 'react-router-dom';
import Navigation from './constants/Navigation/Navigation.jsx';
import Footer from './constants/Footer/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import NewProduct from './pages/NewProduct/NewProduct.jsx';
import SignIn from './pages/SignIn/SignIn.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import Inquiries from './pages/Inquiries/Inquiries.jsx';
import Info from './pages/Info/Info.jsx';
import Products from './pages/Products/Products.jsx';
// import Favorites from './pages/Favorites/Favorites.jsx';
// import ShoppingCart from './pages/ShoppingCart/ShoppingCart.jsx';
// import Profile from './pages/Profile/Profile.jsx';
import Error from './pages/Error/Errors.jsx';
import RiDesigners from "./pages/RiDesigners/RiDesigners.jsx";


function App() {
    // const isLoggedIn = false;
  return (
    <>
      <div className="app-container">
          <Navigation />
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/products" element={<Products />}/>
              <Route path="/new-product" element={<NewProduct />}/>
              <Route path="/sign-in" element={<SignIn />}/>
              <Route path="/sign-up" element={<SignUp />}/>
              {/*<Route path="/profile" element={isLoggedIn === true ? <Profile/> : <Navigate to="/"/>}/>*/}
              {/*<Route path="/favorites" element={isLoggedIn === true ? <Favorites/> : <Navigate to="/"/>}/>*/}
              {/*<Route path="/shopping-cart" element={isLoggedIn === true ? <ShoppingCart/> : <Navigate to="/"/>}/>*/}
              <Route path="/info" element={<Info />}/>
              {/*<Route path="/inquiries" element={isLoggedIn === true ? <Inquiries/> : <Navigate to="/"/>}/>*/}
              <Route path="/inquiries" element={<Inquiries />}/>
              <Route path="/ri-designers" element={<RiDesigners />}/>
              <Route path="/error" element={<Error />}/>
          </Routes>
          <Footer />
      </div>
    </>
  )
}

export default App
