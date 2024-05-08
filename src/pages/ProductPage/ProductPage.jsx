import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCardLarge from "../../components/ProductCardLarge/ProductCardLarge.jsx";
import "./ProductPage.scss"

function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

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

    const handleAddFavorite = async () => {
        if (!isLoggedIn()) {
            navigate('/signin');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/addFavorite/${getUsername()}/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // Add other headers as needed, e.g., authorization token
                },
                // Add request body if needed
            });
            if (response.ok) {
                setIsFavorite(true); // Update UI to indicate product is now a favorite
            } else {
                console.error('Failed to add product to favorites');
            }
        } catch (error) {
            console.error('Error adding product to favorites:', error);
        }
    };

    const isLoggedIn = () => {
        // Implement your logic to check if the user is logged in
        // For example, check if there is a token in localStorage or a session cookie
        // Return true if logged in, false otherwise
        return false; // Replace with your logic
    };

    const getUsername = () => {
        // Implement your logic to get the username
        // For example, retrieve it from localStorage or the state if available
        return ''; // Replace with your logic
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
                    />
                )}
            </div>
        </div>
    );
}

export default ProductPage;
