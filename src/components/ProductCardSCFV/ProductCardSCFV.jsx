import PropTypes from 'prop-types';
import './ProductCardSCFV.scss';
import { Link } from 'react-router-dom';

function ProductCardSCFV ({ productId, title, price, designer, images, handleDelete }) {
    return (
        <div className="product-card-wrapper">
            <article className="product-card">
                <section className="product-card-info">
                    <Link to={`/product/${productId}`} className="product-title">{title}</Link>
                    <h4 className="product-price">€{price.toFixed(2)}</h4>
                    <p className="designer-product">{designer}</p>
                    <button className="deleting-product" onClick={() => handleDelete(productId)}>Verwijder RiDesign</button>
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

ProductCardSCFV.propTypes = {
    productId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    designer: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default ProductCardSCFV;