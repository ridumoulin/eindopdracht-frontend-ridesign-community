import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCardLarge from "../../components/ProductCardLarge/ProductCardLarge.jsx";
import axios from "axios";
import "./ProductPage.scss";
import isTokenValid from "../../helpers/isTokenValid";
import {jwtDecode} from "jwt-decode";

function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleAddFavorite = async () => {
        if (!isLoggedIn()) {
            navigate('/sign-in');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8080/users/addFavorite/${getUserEmail()}/${productId}`);
            if (response.status === 200) {
                setIsFavorite(true);
            } else {
                console.error('Failed to add product to favorites');
            }
        } catch (error) {
            console.error('Error adding product to favorites:', error);
        }
    };

    const handleAddToCart = async () => {
        if (!isLoggedIn()) {
            navigate('/sign-in');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8080/shopping-cart/users/${getUserEmail()}/products/${productId}/add-to-cart`);
            if (response.status === 200) {
                console.log('Product added to cart successfully');
            } else {
                console.error('Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        const isValidToken = isTokenValid(token);
        const isLoggedIn = !!token && isValidToken;
        console.log('User logged in:', isLoggedIn);
        return isLoggedIn;
    };

    const getUserEmail = () => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        return decodedToken.sub;
    };

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
                        isFavorite={isFavorite}
                        onFavoriteToggle={handleAddFavorite}
                        onAddToCart={handleAddToCart}
                    />
                )}
            </div>
        </div>
    );
}

export default ProductPage;
