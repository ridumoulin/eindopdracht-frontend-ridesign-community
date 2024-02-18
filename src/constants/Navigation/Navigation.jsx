import './Navigation.scss';
import { useForm } from 'react-hook-form';
import { NavLink, Link } from 'react-router-dom';
import { useState } from "react";

import { ReactComponent as Logo } from '../../assets/nav/logo.svg';
import { ReactComponent as Heart } from '../../assets/nav/heart-icon.svg';
import { ReactComponent as ShoppingCart } from '../../assets/nav/shopping-cart-icon.svg';
import { ReactComponent as Profile } from '../../assets/nav/profile-icon.svg';
import { ReactComponent as Search } from '../../assets/nav/search-icon.svg';

function Navigation() {
    const { register, handleSubmit } = useForm();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showProductDropdown, setShowProductDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const onSubmit = (data) => {
        console.log('Search term:', data.search);
    };

    const handleChange = (event) => {
        const selectedLanguage = event.target.value;
        console.log('Selected language:', selectedLanguage);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const showProductMenu = () => {
        setShowProductDropdown(true);
        setShowProfileDropdown(false);
    };

    const hideProductMenu = () => {
        setShowProductDropdown(false);
    };

    const showProfileMenu = () => {
        setShowProfileDropdown(true);
        setShowProductDropdown(false);
    };

    const hideProfileMenu = () => {
        setShowProfileDropdown(false);
    };


    return (
        <nav className="outer-container-nav">
            <div className="inner-container-nav">

                <Link to="/" className="logo-wrapper">
                    <Logo className="logo" />
                </Link>

                <div className="nav-content">
                    <div className="icons">
                        <Link to="/favorites">
                            <Heart className="nav-icon" />
                        </Link>
                        <Link to="/shopping-cart">
                            <ShoppingCart className="nav-icon"/>
                        </Link>

                        <span onMouseEnter={showProfileMenu} onMouseLeave={hideProfileMenu}>
                            <Profile className="nav-icon"/>
                        </span>
                        {showProfileDropdown && (
                            <div className="profile-dropdown" onMouseEnter={showProfileMenu} onMouseLeave={hideProfileMenu}>
                                <ul>
                                    <li><Link to="/sign-in">Inloggen</Link></li>
                                    <li><Link to="/sign-up">Aanmelden</Link></li>
                                </ul>
                            </div>
                        )}

                    </div>

                    <div className="nav-content-down">
                        <form onSubmit={handleSubmit(onSubmit)} className="search-form">
                            <div className="search-container">
                                <input
                                    type="text"
                                    {...register('search')}
                                    placeholder="Zoek product"
                                    className="search-input"
                                />
                                <Search className="search-icon" />
                            </div>
                        </form>

                        <ul>
                            <li>
                                <NavLink
                                    onMouseEnter={showProductMenu}
                                    onMouseLeave={hideProductMenu}
                                    className={showProductDropdown ? "active-menu-link" : "default-menu-link"} // Apply the classNames based on the state
                                    to="/OverviewProducts"
                                >
                                    Producten
                                </NavLink>
                                {showProductDropdown && (
                                    <div className="product-dropdown" onMouseEnter={showProductMenu} onMouseLeave={hideProductMenu}>
                                        <ul>
                                            <li><Link to="/sofas">Banken</Link></li>
                                            <li><Link to="/beds">Bedden</Link></li>
                                            <li><Link to="/closet">Kasten</Link></li>
                                            <li><Link to="/chairs-fauteuils">Stoelen & fauteuils</Link></li>
                                            <li><Link to="/tables">Tafels</Link></li>
                                            <li><Link to="/garden-furniture">Tuinmeubelen</Link></li>
                                        </ul>
                                    </div>
                                )}
                            </li>
                            <li>
                                <NavLink className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"} to="/Designers">Ridesigners</NavLink>
                            </li>
                            <li>
                                <NavLink className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"} to="/Info">Info</NavLink>
                            </li>
                        </ul>

                        <ul className="language-dropdown">
                            <li>
                                <select onChange={handleChange} {...register('language')}>
                                    <option value="nl">NL</option>
                                    <option value="en">EN</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
