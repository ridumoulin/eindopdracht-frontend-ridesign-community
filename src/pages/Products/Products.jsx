import './Product.scss';
import {Link} from "react-router-dom";
import ProductCardSmall from "../../components/ProductCard/ProductCard.jsx";

function Products() {
    return(
        <div className="outer-container-overview-products">
            <div className="overview-product-page">
                <section className="category-options">
                    <ul className="category-menu">
                        <li><Link to="/sofas">Banken</Link></li>
                        <li><Link to="/beds">Bedden</Link></li>
                        <li><Link to="/closet">Kasten</Link></li>
                        <li><Link to="/chairs-fauteuils">Stoelen & fauteuils</Link></li>
                        <li><Link to="/tables">Tafels</Link></li>
                        <li><Link to="/garden-furniture">Tuinmeubelen</Link></li>
                    </ul>
                </section>
                <section className="section-products">
                    <ProductCardSmall />
                </section>
            </div>
        </div>
    )
}

export default Products;