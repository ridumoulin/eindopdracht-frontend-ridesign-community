import PropTypes from 'prop-types';

import './ProductCardLarge.scss';

function ProductCardLarge({images, title, price, measurements, materials, designer, description }) {
    return (
        <div className="product-card-large-wrapper">
            <div className="product-card-larg">
                <section className="product-card-photos-wrapper">
                    {images && images.length > 0 ? (
                        <img src={images[0]} alt={title} className="product-card-photo" />
                    ) : (
                        <p>Geen foto beschikbaar</p>
                    )}
                </section>

                <section className="product-card-large-info">
                    <h3 className="product-title-large">{title}</h3>
                    <h4 className="product-price-large">€{price.toFixed(2)}</h4>
                    <p className="product-measurements">{measurements}</p>
                    <p className="product-materials">{materials}</p>
                    <p className="designer-product">{designer}</p>
                    <p className="product-description">{description}</p>
                </section>
            </div>
        </div>
    );
}

ProductCardLarge.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    measurements: PropTypes.string.isRequired,
    materials: PropTypes.string.isRequired,
    designer: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductCardLarge;