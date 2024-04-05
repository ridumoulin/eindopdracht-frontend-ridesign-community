import './Profile.scss';
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function Profile() {
    const { currentUser } = useContext(AuthContext);
    const [userProducts, setUserProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;

    useEffect(() => {
        if (currentUser) {
            fetchUserProducts(currentUser.username);
        }
    }, [currentUser]);


    const fetchUserProducts = async (username) => {
        try {
            const response = await fetch(`http://localhost:8080/users/${username}/products`);
            console.log(response.data);
            setUserProducts(response.data);
        } catch (error) {
            console.error('Error fetching user products:', error);
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = userProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="outer-container-profile">
            <div className="profile-page">
                <section className="section-user-information">
                    <h2 className="first-name">Hey you! {currentUser && currentUser.firstname}</h2>
                    <div>
                        <img />
                    </div>
                    <p>Gebruikersnaam: </p>
                </section>
                <section className="section-user-ridesigns">
                    <ProductCard products={currentProducts} />

                    {currentPage > 1 && (
                        <button onClick={prevPage}>Previous</button>
                    )}

                    {indexOfLastProduct < userProducts.length && (
                        <button onClick={nextPage}>Next</button>
                    )}
                </section>
            </div>
        </div>
    )
}

export default Profile;