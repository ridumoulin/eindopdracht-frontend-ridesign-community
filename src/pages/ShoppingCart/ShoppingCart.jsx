import './ShoppingCart.scss';
import ProductCardSCFV from "../../components/ProductCardSCFV/ProductCardSCFV.jsx";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/Button/Button.jsx";

function ShoppingCart() {
    const { user } = useContext(AuthContext);
    const [shoppingCart, setShoppingCart] = useState({ products: [] });
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const [currentProducts, setCurrentProducts] = useState([]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    useEffect(() => {
        const fetchShoppingCart = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8080/shopping-cart/user/${user.email}/products`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                if (response.data && response.data.products) {
                    setShoppingCart(response.data);
                } else {
                    console.error('Unexpected response data:', response.data);
                }
            } catch (error) {
                console.error('Error fetching shopping cart:', error);
            }
        };

        if (user && user.email) {
            fetchShoppingCart();
        }
    }, [user]);

    useEffect(() => {
        if (shoppingCart.products.length) {
            setCurrentProducts(shoppingCart.products.slice(indexOfFirstProduct, indexOfLastProduct));
        } else {
            setCurrentProducts([]);
        }
    }, [shoppingCart, currentPage]);

    const handleDelete = async (productId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/shopping-cart/user/${user.email}/remove-from-cart/${productId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            setShoppingCart((prevCart) => ({
                ...prevCart,
                products: prevCart.products.filter(product => product.productId !== productId)
            }));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="outer-container-shopping-cart">
            <div className="content-shopping-cart">
                <div>
                    {currentProducts.length ? (
                    currentProducts.map(product => (
                        <ProductCardSCFV
                            key={product.productId}
                            productId={product.productId}
                            title={product.productTitle}
                            price={product.price}
                            designer={product.username}
                            images={"data:image/jpeg;base64," + product.images[0]}
                            handleDelete={() => handleDelete(product.productId)}
                        />
                    ))
                    ) : (
                        <div>Geen producten in het winkelmandje</div>
                    )}
                </div>
                <div className="pagination-buttons">
                    {currentPage > 1 && (
                        <Button type="button" onClick={prevPage} text="Vorige" className="pagination-buttons" />
                    )}
                    {indexOfLastProduct < shoppingCart.products.length && (
                        <Button type="button" onClick={nextPage} text="Volgende" className="pagination-buttons"/>
                    )}
                </div>
                <Button type="button" text="Afrekenen" className="button-checkout"/>
            </div>
        </div>
    );
}

export default ShoppingCart;