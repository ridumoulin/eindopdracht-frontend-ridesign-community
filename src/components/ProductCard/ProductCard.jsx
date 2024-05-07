import PropTypes from 'prop-types';

import './ProductCard.scss';
import { Link } from 'react-router-dom';

function ProductCard({ title, price, designer, images }) {
    return (
        <div className="product-card-wrapper">
            <article className="product-card">
                <section className="product-card-info">
                    <Link to="/product-page" className="product-title">{title}</Link>
                    <h4 className="product-price">€{price.toFixed(2)}</h4>
                    <p className="designer-product">{designer}</p>
                </section>

                <section className="product-card-photo-wrapper">
                    {images ? (
                        <img src={images} alt={title} className="product-card-photo" />
                    ) : (
                        <p>Geen foto beschikbaar</p>
                    )}
                </section>
            </article>
        </div>
    );
}

ProductCard.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    designer: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductCard;
