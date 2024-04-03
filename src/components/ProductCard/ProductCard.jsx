import './ProductCard.scss';
import meubelstuk from '../../assets/general/photo-tables-ri-1.png';
import { Link } from 'react-router-dom';

function ProductCard() {
    return (
        <div className="product-card-wrapper">
            <article className="product-card">
                <section className="product-card-info">
                    <Link to="/product-page" className="product-title">Naam product</Link>
                    <h4 className="product-price">€prijs,-</h4>
                    <p className="designer-product">RiDesigner</p>
                </section>

                <section className="product-card-photo-wrapper">
                    <img src={meubelstuk} alt="meubelstuk" className="product-card-photo" />
                </section>
            </article>
        </div>
    )
}

export default ProductCard;

