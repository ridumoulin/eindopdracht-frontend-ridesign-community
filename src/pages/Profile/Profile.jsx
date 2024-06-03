import './Profile.scss';
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import axios from 'axios';
import InquiryCard from "../../components/InquiryCard/InquiryCard.jsx";

function Profile() {
    const { user, isAuth } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [userProducts, setUserProducts] = useState([]);
    const [userInquiries, setUserInquiries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;

    useEffect(() => {
        const fetchUserData = async () => {
            if (user && user.email) {
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.get(`http://localhost:8080/users/${user.email}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log(response.data);
                    setUserData(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        // const fetchUserProducts = async (email) => {
        //     try {
        //         const response = await axios.get(`http://localhost:8080/products?username=${email}`);
        //         setUserProducts(response.data);
        //     } catch (error) {
        //         console.error('Error fetching user products:', error);
        //     }
        // };

        const fetchUserInquiries = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/inquiries`);
                setUserInquiries(response.data);
            } catch (error) {
                console.error('Error fetching user inquiries:', error);
            }
        };

        if (user) {
            fetchUserData();
            // fetchUserProducts(user.username);
            if (user.role === 'Admin') {
                fetchUserInquiries(user.email);
            }
        }
    }, [user]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = userProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    if (!isAuth) {
        return <div>Please log in to view your profile.</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="outer-container-profile">
            <div className="profile-page">
                <section className="user-information">
                    <h2 className="first-name">Hey you! {userData.firstname}</h2>
                    <div>
                        <img src={"data:image/jpeg;base64," + userData.images[0]} alt={userData.username} className="user-photo" />
                    </div>
                    <p>Gebruikersnaam: {userData.username}</p>
                </section>
                <section className="users-content">
                    <div className="user-products">
                        {currentProducts.map(product => (
                            <ProductCard
                                key={product.productId}
                                productId={product.productId}
                                title={product.productTitle}
                                price={product.price}
                                designer={product.username}
                                images={"data:image/jpeg;base64," + product.images[0]}
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
                        {userInquiries.map(inquiry => (
                            <InquiryCard
                                key={inquiry.id}
                                inquiryType={inquiry.inquiryType}
                                email={inquiry.email}
                                messageField={inquiry.messageField}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Profile;