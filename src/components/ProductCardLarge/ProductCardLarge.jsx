import { useState } from 'react';
import PropTypes from 'prop-types';
import './ProductCardLarge.scss';
import { ReactComponent as HG } from '../../assets/general/heart-green.svg';
import { ReactComponent as Heart } from '../../assets/nav/heart-icon.svg';

function ProductCardLarge({ images, title, price, measurements, materials, designer, description }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteToggle = () => {
        setIsFavorite((prevFavorite) => !prevFavorite);
    };

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="product-card-large-wrapper">
            <div className="product-card-large">
                <section className="product-card-photos-wrapper">
                    <div className="image-navigation left" onClick={goToPreviousImage}></div>
                    <img src={"data:image/jpeg;base64, " + images[currentImageIndex]} alt={title} className="product-card-photo" />
                    <div className="image-navigation right" onClick={goToNextImage}></div>
                </section>

                <section className="product-card-large-info">
                    <div className="product-title-and-heart">
                        <h3 className="product-title-large">{title}</h3>
                        {isFavorite ? (
                            <HG className="heart-icon-product-filled" onClick={handleFavoriteToggle} />
                        ) : (
                            <Heart className="heart-icon-product" onClick={handleFavoriteToggle} />
                        )}
                    </div>
                    <h4 className="product-price-large">€{price.toFixed(2)}</h4>
                    <p className="product-measurements">{measurements}</p>
                    <p className="product-materials">{materials}</p>
                    <p className="designer-product">Door {designer}</p>
                    <p className="product-description">{description}</p>
                    <button>Toevoegen winkelmand</button>
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