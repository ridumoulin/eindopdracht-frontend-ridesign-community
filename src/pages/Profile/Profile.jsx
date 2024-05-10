import './Profile.scss';
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import axios from 'axios';
import InquiryCard from "../../components/InquiryCard/InquiryCard.scss";

function Profile() {
    const { currentUser } = useContext(AuthContext);
    const [userProducts, setUserProducts] = useState([]);
    const [userInquiries, setUserInquiries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;
    const inquiriesPerPage = 4;

    useEffect(() => {
        const fetchUserProducts = async (username) => {
            try {
                const response = await axios.get(`http://localhost:8080/users/${username}/products`);
                console.log(response.data);
                setUserProducts(response.data);
            } catch (error) {
                console.error('Error fetching user products:', error);
            }
        };

        const fetchUserInquiries = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/inquiries`);
                console.log(response.data);
                setUserInquiries(response.data);
            } catch (error) {
                console.error('Error fetching user inquiries:', error);
            }
        };

        if (currentUser) {
            fetchUserProducts(currentUser.username);
            if (currentUser.role === 'Admin') {
                fetchUserInquiries(currentUser.username);
            }
        }
    }, [currentUser]);

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
                <section className="user-information">
                    <h2 className="first-name">Hey you! {currentUser && currentUser.firstname}</h2>
                    <div>
                        <img />
                    </div>
                    <p>Gebruikersnaam: </p>
                </section>
                <section className="users-content">
                    <div className="user-ridesigns">
                        {userProducts().map(product => (
                            <ProductCard
                                key={product.productId}
                                productId={product.productId}
                                title={product.productTitle}
                                price={product.price}
                                designer={product.username}
                                images={"data:image/jpeg;base64, " + product.images[0]}
                            />
                        ))}

                        {currentPage > 1 && (
                            <button onClick={prevPage}>Previous</button>
                        )}

                        {indexOfLastProduct < userProducts.length && (
                            <button onClick={nextPage}>Next</button>
                        )}

                    </div>
                    <div className="users-inquiries">
                        <h3>Aanvragen</h3>
                        {userInquiries().map(inquiry => (
                            <InquiryCard
                            inquiryType={inquiry.inquiryType}
                            email={inquiry.email}
                            messageField={inquiry.messageField}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Profile;