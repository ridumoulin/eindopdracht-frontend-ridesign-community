import './Profile.scss';
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import axios from 'axios';
import InquiryCard from "../../components/InquiryCard/InquiryCard.jsx";
import TextInput from "../../components/TextInput/TextInput.jsx";
import { useForm } from 'react-hook-form';

function Profile() {
    const { user, isAuth } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [userInquiries, setUserInquiries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;
    const [currentProducts, setCurrentProducts] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showUpdateUsernameForm, setShowUpdateUsernameForm] = useState(false);
    const [newUsername, setNewUsername] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

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

        if (user) {
            fetchUserData();
        }
    }, [user]);

    useEffect(() => {
        const fetchUserInquiries = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get('http://localhost:8080/inquiries', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Inquiries:", response.data);
                setUserInquiries(response.data);
            } catch (error) {
                console.error('Error fetching user inquiries:', error);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                } else if (error.request) {
                    console.error('Request data:', error.request);
                } else {
                    console.error('Error message:', error.message);
                }
                console.error('Error config:', error.config);
            }
        };

        if (userData && userData.authorities) {
            const isAdmin = userData.authorities.some(auth => auth.authority === 'ROLE_ADMIN');
            console.log('Is Admin:', isAdmin);
            if (isAdmin) {
                fetchUserInquiries();
            }
        }
    }, [userData]);

    useEffect(() => {
        if (userData && userData.products) {
            setCurrentProducts(userData.products.slice(indexOfFirstProduct, indexOfLastProduct));
        }
    }, [userData, currentPage]);

    useEffect(() => {
        const handlePhotoUpload = async () => {
            if (selectedFile) {
                const formData = new FormData();
                formData.append('image', selectedFile);

                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.post(`http://localhost:8080/image/user/${user.email}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log('Photo uploaded successfully:', response.data);
                    setUserData(prevData => ({
                        ...prevData,
                        imageData: response.data.imageData
                    }));
                } catch (error) {
                    console.error('Error uploading photo:', error);
                }
            }
        };

        handlePhotoUpload();
    }, [selectedFile, user.email]);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpdateUsername = async (e) => {
        e.preventDefault();
        if (newUsername.trim() === '') {
            alert("Username cannot be empty");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`http://localhost:8080/users/${user.email}`,
                { username: newUsername },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Username updated successfully:', response.data);
            setUserData(prevData => ({
                ...prevData,
                username: newUsername
            }));
            setShowUpdateUsernameForm(false);
            setNewUsername('');
        } catch (error) {
            console.error('Error updating username:', error);
        }
    };

    if (!isAuth) {
        return <div>Graag inloggen.</div>;
    }

    if (!userData || !userData.products) {
        return <div>Loading...</div>;
    }

    return (
        <div className="outer-container-profile">
            <div className="profile-page">
                <section className="user-information">
                    <div className="wrapper-profile-photo">
                        {userData.imageData ? (
                            <img src={"data:image/jpeg;base64," + userData.imageData.imageData.replace(/"/g, "")} alt={userData.username} className="user-photo" />
                        ) : (
                            <div>
                                <input type="file" onChange={handleFileChange} />
                            </div>
                        )}
                    </div>

                    <h2 className="first-name">Hey you! {userData.firstname}</h2>
                    <p>Gebruikersnaam: {userData.username}</p>

                    <button onClick={() => setShowUpdateUsernameForm(!showUpdateUsernameForm)} className="button-show-update-form">
                        Gebruikersnaam aanpassen
                    </button>

                    {showUpdateUsernameForm && (
                        <form onSubmit={handleSubmit(handleUpdateUsername)} className="update-username-form">
                            <div style={{ width: '100%', maxWidth: '10rem' }}>
                                <TextInput
                                    id="newUsername"
                                    label=""
                                    type="text"
                                    placeholder="Nieuwe gebruikersnaam"
                                    register={register}
                                    errors={errors.newUsername}
                                />
                            </div>
                            <button type="submit" className="button-update-username">Opslaan</button>
                        </form>
                    )}
                </section>

                <section className="users-content">
                    <div className="user-products">
                        <h3>Producten</h3>
                        <div className="profile-products">
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
                        </div>
                        <div className="button-section-profile">
                            {currentPage > 1 && (
                            <button onClick={prevPage} className="button-profile">Vorige</button>
                            )}

                            {indexOfLastProduct < userData.products.length && (
                            <button onClick={nextPage} className="button-profile">Volgende</button>
                            )}
                        </div>
                    </div>
                    {userData && userData.authorities && userData.authorities.some(auth => auth.authority === 'ROLE_ADMIN') && (
                        <div className="users-inquiries">
                            <h3>Aanvragen</h3>
                            <div className="users-inquiries-cards">
                                {userInquiries.map(inquiry => (
                                <InquiryCard
                                    key={inquiry.inquiryId}
                                    inquiryType={inquiry.inquiryType}
                                    email={inquiry.email}
                                    description={inquiry.description}
                                />
                                ))}
                            </div>
                            <div className="button-section-profile">
                                {currentPage > 1 && (
                                <button onClick={prevPage} className="button-profile">Vorige</button>
                                )}

                                {indexOfLastProduct < userData.products.length && (
                                <button onClick={nextPage} className="button-profile">Volgende</button>
                                )}
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Profile;