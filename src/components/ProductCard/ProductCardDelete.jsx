import PropTypes from 'prop-types';
import './ProductCard.scss';
import { Link } from 'react-router-dom';

function ProductCardDelete({ productId, title, price, designer, images, onDelete }) {
    return (
        <div className="product-card-wrapper">
            <article className="product-card">
                <section className="product-card-info">
                    <Link to={`/product/${productId}`} className="product-title">{title}</Link>
                    <h4 className="product-price">€{price.toFixed(2)}</h4>
                    <p className="designer-product">{designer}</p>


                    <div className="button-deleting-product" onClick={onDelete}>Verwijder</div>
                </section>

                <section className="product-card-photo-wrapper">
                    {images && images.length > 0 ? (
                        <img src={images} alt={title} className="product-card-photo" />
                    ) : (
                        <p>Geen foto beschikbaar</p>
                    )}
                </section>
            </article>
        </div>
    );
}

ProductCardDelete.propTypes = {
    productId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    designer: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ProductCardDelete;