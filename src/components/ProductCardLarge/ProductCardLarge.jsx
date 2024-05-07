import PropTypes from 'prop-types';

import './ProductCardLarge.scss';

function ProductCardLarge({ title, price, designer, images }) {
    return (
        <div className="product-card-large-wrapper">
            <div className="product-card-larg">
                <section className="product-card-photos-wrapper">
                    {images ? (
                        <img src={images} alt={title} className="product-card-photo" />
                    ) : (
                        <p>Geen foto beschikbaar</p>
                    )}
                </section>

                <section className="product-card-large-info">
                    <h3 className="product-title">{title}</h3>
                    <h4 className="product-price">€{price.toFixed(2)}</h4>
                    <p className="designer-product">{designer}</p>
                </section>
            </div>
        </div>
    );
}

ProductCardLarge.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    designer: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductCardLarge;