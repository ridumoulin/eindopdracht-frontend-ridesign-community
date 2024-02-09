import './Navigation.scss';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/nav/shopping-cart-icon.svg';
// import { ReactComponent as Heart } from '../../assets/nav/heart-icon.svg';
// import { ReactComponent as ShoppingCart } from '../../assets/nav/shopping-cart-icon.svg';
// import { ReactComponent as Profile } from '../../assets/nav/profile-icon.svg';

function Navigation() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log('Search term:', data.search);
    };

    const handleChange = (event) => {
        const selectedLanguage = event.target.value;
        console.log('Selected language:', selectedLanguage);
    };

    return (
        <nav className="outer-container-nav">
            <div className="inner-container-nav">

                <Logo />

                <div className="nav-content">
                    <div className="icons">
                        {/*<Heart />*/}
                        {/*<ShoppingCart />*/}
                        {/*<Profile />*/}
                    </div>

                    <div className="nav-content-down">
                        <form onSubmit={handleSubmit(onSubmit)} className="search-form">
                            <input
                                type="text"
                                {...register('search')}
                                placeholder="Zoek product"
                            />
                        </form>

                        <ul>
                            <li>
                                <NavLink className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"} to="/OverviewProducts">Producten</NavLink>
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
