import './Favorites.scss';
import ProductCardSCFV from "../../components/ProductCardSCFV/ProductCardSCFV.jsx";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Favorites() {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const [currentProducts, setCurrentProducts] = useState([]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8080/users/${user.email}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                if (response.data && response.data.favorites) {
                    setFavorites(response.data.favorites);
                } else {
                    console.error('Unexpected response data:', response.data);
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        if (user && user.email) {
            fetchFavorites();
        }
    }, [user]);

    useEffect(() => {
        if (favorites.length) {
            setCurrentProducts(favorites.slice(indexOfFirstProduct, indexOfLastProduct));
        } else {
            setCurrentProducts([]);
        }
    }, [favorites, currentPage]);

    const handleDelete = async (productId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/favorites/user/removeFavorite/${user.email}/${productId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            setFavorites((prevFavorites) => prevFavorites.filter(product => product.productId !== productId));
        } catch (error) {
            console.error('Error deleting product from favorites:', error);
        }
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="outer-container-favorites">
            <div className="content-favorites">
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
                    <div>Geen favorieten</div>
                )}
                <div className="pagination-buttons">
                    {currentPage > 1 && (
                        <button onClick={prevPage} className="pagination-buttons">Vorige</button>
                    )}
                    {indexOfLastProduct < favorites.length && (
                        <button onClick={nextPage} className="pagination-buttons">Volgende</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Favorites;