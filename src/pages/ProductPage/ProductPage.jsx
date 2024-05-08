import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCardLarge from "../../components/ProductCardLarge/ProductCardLarge.jsx";
import "./ProductPage.scss"

function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/products/${productId}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

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
                        designer={product.username}
                        description={product.description}
                        images={product.images}
                    />
                )}
            </div>
        </div>
    );
}

export default ProductPage;
