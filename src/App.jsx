import './App.scss'
import { Routes, Route } from 'react-router-dom';
import Navigation from './constants/Navigation/Navigation.jsx';
import Footer from './constants/Footer/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import NewProduct from "./pages/NewProduct/NewProduct.jsx";

function App() {
    // const isLoggedIn = false;
  return (
    <>
      <div className="app-container">
          <Navigation />
          <Routes>
              <Route path="/" element={<Home />}/>
          {/*    <Route path="/OverviewProducts" element={<OverviewProducts />}/>*/}
          {/*    <Route path="/Products" element={<Products />}/>*/}
              <Route path="/NewProduct" element={<NewProduct />}/>
          {/*    <Route path="/SignIn" element={<SignIn />}/>*/}
          {/*    <Route path="/SignUp" element={<SignUp />}/>*/}
          {/*    <Route path="/Profile" element={isLoggedIn === true ? <LogIn/> : <Navigate to="/"/>}/>*/}
          {/*    <Route path="/Favorites" element={<Favorites />}/>*/}
          {/*    <Route path="/ShoppingCart" element={<ShoppingCart />}/>*/}
          {/*    <Route path="/Info" element={<Info />}/>*/}
          {/*    <Route path="/Inquiries" element={<Inquiries />}/>*/}
          {/*    <Route path="/Error" element={<Error />}/>*/}
          </Routes>
          <Footer />
      </div>
    </>
  )
}

export default App
