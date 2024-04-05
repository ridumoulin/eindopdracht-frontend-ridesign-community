import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProductCard() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/products');
                console.log(response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="product-card-wrapper">
            {products && products.map(product => (
                <article key={product.productId} className="product-card">
                    <section className="product-card-info">
                        <Link to="/product-page" className="product-title">{product.productTitle}</Link>
                        <h4 className="product-price">€{product.price.toFixed(2)}</h4>
                        <p className="designer-product">{product.designer}</p>
                    </section>

                    <section className="product-card-photo-wrapper">
                        {product.images.length > 0 && (
                            <img src={product.images[0]} alt={product.productTitle} className="product-card-photo" />
                        )}
                    </section>
                </article>
            ))}
        </div>
    );
}

export default ProductCard;
