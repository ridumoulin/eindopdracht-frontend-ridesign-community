import './App.scss'
import {Routes, Route, Navigate} from 'react-router-dom';
import Navigation from './constants/Navigation/Navigation.jsx';
import Footer from './constants/Footer/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import NewProduct from './pages/NewProduct/NewProduct.jsx';
import SignIn from './pages/SignIn/SignIn.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import Inquiries from './pages/Inquiries/Inquiries.jsx';
import Info from './pages/Info/Info.jsx';
import Products from './pages/Products/Products.jsx';
import Favorites from './pages/Favorites/Favorites.jsx';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Error from './pages/Error/Errors.jsx';
import RiDesigners from "./pages/RiDesigners/RiDesigners.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import {useContext} from "react";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";

function App() {
    const { isAuth } = useContext(AuthContext);

    return (
        <div className="app-container">
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route path="/new-product" element={isAuth ? <NewProduct /> : <Navigate to="/sign-in" />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/sign-in" />} />
                <Route path="/favorites" element={isAuth ? <Favorites /> : <Navigate to="/sign-in" />} />
                <Route path="/shopping-cart" element={isAuth ? <ShoppingCart /> : <Navigate to="/sign-in" />} />
                <Route path="/info" element={<Info />} />
                <Route path="/inquiries" element={isAuth ? <Inquiries /> : <Navigate to="/sign-in" />} />
                <Route path="/ri-designers" element={isAuth ? <RiDesigners /> : <Navigate to="/sign-in"/>} />
                <Route path="/error" element={<Error />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
