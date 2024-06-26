import './Profile.scss';
import ProductCardDelete from "../../components/ProductCard/ProductCardDelete.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import axios from 'axios';
import InquiryCard from "../../components/InquiryCard/InquiryCard.jsx";
import TextInput from "../../components/TextInput/TextInput.jsx";
import { useForm } from 'react-hook-form';
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload.jsx";
import Button from "../../components/Button/Button.jsx";

function Profile() {
    const { user, isAuth } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [userInquiries, setUserInquiries] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showUpdateUsernameForm, setShowUpdateUsernameForm] = useState(false);
    const { register, handleSubmit, formState: { errors }} = useForm();

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

    const deleteInquiry = async (inquiryId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete(`http://localhost:8080/inquiries/${inquiryId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Response:", response);
            console.log("Inquiry deleted successfully:", inquiryId);

            setUserInquiries(prevInquiries => prevInquiries.filter(inquiry => inquiry.inquiryId !== inquiryId));
        } catch (error) {
            console.error('Error deleting inquiry:', error);

            if (error.response) {
                console.log('Response status:', error.response.status);
                console.log('Response data:', error.response.data);
            } else {
                console.log('Error message:', error.message);
            }
        }
    };

    const deleteProduct = async (productId) => {
        const token = localStorage.getItem("token");
        console.log("Deleting product with ID:", productId);
        console.log("Token:", token);

        try {
            const response = await axios.delete(`http://localhost:8080/products/${productId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Response:", response);
            console.log("Product deleted successfully:", productId);

            const updatedProducts = userData.products.filter(product => product.productId !== productId);

            setUserData(prevUserData => ({
                ...prevUserData,
                products: updatedProducts
            }));
        } catch (error) {
            console.error('Error deleting product:', error);

            if (error.response) {
                console.log('Response status:', error.response.status);
                console.log('Response data:', error.response.data);
            } else {
                console.log('Error message:', error.message);
            }
        }
    };

    const handlePhotoUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            const token = localStorage.getItem("token");

            try {
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

    const handleFileChange = (file) => {
        setSelectedFile(file);
    };

    const handleUpdateUsername = async (data) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:8080/users/${user.email}`,
                { username: data.newUsername },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Username updated successfully:', response.data);
            const userDataResponse = await axios.get(`http://localhost:8080/users/${user.email}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            setUserData(userDataResponse.data);
            setShowUpdateUsernameForm(false);
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
                    <div className="wrapper-profile">
                            {userData.imageData ? (
                                    <div className="wrapper-profile-photo">
                                        <img src={"data:image/jpeg;base64, " + userData.imageData} alt={userData.username} className="user-photo" />
                                    </div>
                            ) : (
                                <form className="user-photo-form" onSubmit={handleSubmit(handlePhotoUpload)}>
                                    <PhotoUpload
                                        value={selectedFile ? selectedFile : null}
                                        setValue={setSelectedFile}
                                        handleFileChange={handleFileChange}
                                        register={register}
                                        errors={errors.photo}
                                    />
                                    <Button className="button-add-photo" text="Opslaan" type="submit"/>
                                </form>
                            )}

                    </div>
                    <div className="user-hello-username">
                        <h2 className="first-name">Hey you! {userData.firstname}</h2>
                        <p>Gebruikersnaam: {userData.username}</p>


                        <Button onClick={() => setShowUpdateUsernameForm(!showUpdateUsernameForm)} className="button-show-update-form" text="Gebruikersnaam aanpassen" />


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
                            <Button className="button-update-username" text="Opslaan" type="submit"/>
                        </form>
                        )}
                    </div>
                </section>

                <section className="users-content">
                    <div className="user-products">
                        <h3>Producten</h3>
                        <div className="profile-products">
                            {userData.products.map(product => (
                                <ProductCardDelete
                                    key={product.productId}
                                    productId={product.productId}
                                    title={product.productTitle}
                                    price={product.price}
                                    designer={product.username}
                                    images={"data:image/jpeg;base64," + product.images[0]}
                                    onDelete={() => deleteProduct(product.productId)}
                                />
                            ))}
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
                                        onDelete={() => deleteInquiry(inquiry.inquiryId)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Profile;