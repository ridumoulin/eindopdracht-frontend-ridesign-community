import './ProductPage.scss';
import ProductCardLarge from "../../components/ProductCardLarge/ProductCardLarge.jsx";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

function ProductPage({ match }) {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/products/${match.params.productId}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [match.params.productId]);

    return(
        <div className="outer-container-product-page">
            <div className="content-product-page">
                {product && (
                    <ProductCardLarge
                        key={product.productId}
                        title={product.productTitle}
                        price={product.price}
                        measurements={product.measurements}
                        materials={product.materials}
                        designer={product.designer}
                        description={product.description}
                        images={product.images}
                    />
                )}
            </div>
        </div>
    );
}

ProductPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            productId: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default ProductPage;
