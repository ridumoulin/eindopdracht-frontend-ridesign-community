import React from 'react';
import './Navigation.scss';
import logo from '../../assets/nav/logo-small.png'
import { useForm } from 'react-hook-form';

function Navigation() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log('Search term:', data.search);
    };
    return (
        <nav className="outer-container-nav">
            <div className="inner-container-nav">

                <img className="logo-nav" src={logo} alt="Logo RiDesign"/>

                <div className="nav-content">
                    <div className="icons">

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
                            <li>Producten</li>
                            <li>Ridesigners</li>
                            <li>Info</li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
