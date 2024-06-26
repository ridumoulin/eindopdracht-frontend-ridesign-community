import {useContext, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCardLarge from "../../components/ProductCardLarge/ProductCardLarge.jsx";
import axios from "axios";
import "./ProductPage.scss";
import isTokenValid from "../../helpers/isTokenValid";
import {jwtDecode} from "jwt-decode";
import {AuthContext} from "../../context/AuthContext.jsx";

function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

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
            const token = localStorage.getItem("token");
            const response = await axios.post(`http://localhost:8080/users/addFavorite/${user.username}/${productId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setIsFavorite(true);
            } else {
                console.error('Failed to add product to favorites');
            }
        } catch (error) {
            console.error('Error adding product to favorites:', error);
        }
    };

    const handleRemoveFavorite = async () => {
        if (!isLoggedIn()) {
            navigate('/sign-in');
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://localhost:8080/users/removeFavorite/${getUserEmail()}/${productId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setIsFavorite(false);
            } else {
                console.error('Failed to remove product from favorites');
            }
        } catch (error) {
            console.error('Error removing product from favorites:', error);
        }
    };

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            handleRemoveFavorite();
        } else {
            handleAddFavorite();
        }
    };

    const handleAddToCart = async () => {
        console.log("hoi");
        if (!isLoggedIn()) {
            navigate('/sign-in');
            return;
        }

        const token = localStorage.getItem("token");
        console.log(token);
        try {
            const response = await axios.post(
                `http://localhost:8080/shopping-cart/user/${getUserEmail()}/products/${productId}/add-to-cart`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response)
            if (response.status === 201) {
                console.log('Product added to cart successfully');
            } else {
                console.error('Failed to add product to cart', response.data);
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
        console.log('Decoded Token:', decodedToken);
        return decodedToken.sub;
    };

    return (
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
                        onFavoriteToggle={handleFavoriteToggle}
                        onAddToCart={handleAddToCart}
                    />
                )}
            </div>
        </div>
    );
}

export default ProductPage;