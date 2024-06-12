import './NewProduct.scss';
import {useForm} from 'react-hook-form';
import {ReactComponent as GreenDot} from '../../assets/general/green-dot-icon.svg';
import TextInput from "../../components/TextInput/TextInput.jsx";
import Textarea from "../../components/TextArea/Textarea.jsx";
import Checkbox from "../../components/Checkbox/Checkbox.jsx";
import SelectInput from "../../components/SelectInput/SelectInput.jsx";
import {useContext, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import PhotosUpload from "../../components/PhotosUpload/PhotosUpload.jsx";
import {prepareProductData} from "../../helpers/prepareProductData.jsx";
import Button from "../../components/Button/Button.jsx";
import {AuthContext} from "../../context/AuthContext";

function NewProduct() {

    const [values, setValue] = useState([null, null, null]); // Initialize with null for file objects
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:8080';
    const { user } = useContext(AuthContext);

    const token = localStorage.getItem("token");

    async function newProduct(data) {
        data.images = [];
        const preparedData = prepareProductData(data);
        console.log("Data to be sent:", preparedData);
        delete preparedData.photos;
        if (user && user.username) {
            preparedData.username = user.username;
        }
        try {
            const response = await axios.post(`${baseUrl}/products`, preparedData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Product created successfully:", response.data);
            if (response.data){
                sentImages(response.data.productId)
            }

        } catch (error) {
            console.error("Error creating product:", error.response ? error.response.data : error.message);
        }
    }

    async function sentImages(id) {
        for (let i = 0; i < values.length; i++) {
            const formData = new FormData()
            console.log(values[i])
            formData.append("file", values[i]);
            try {
                const response = await axios.post(`${baseUrl}/image/product/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);
            } catch (e) {
                console.error(e);
            }finally {
                navigate('/profile')
            }
        }
    }

    return (
        <div className="outer-container-new-product">
            <form className="form-new-product" onSubmit={handleSubmit(newProduct)}>
                <h2><GreenDot className="green-dot-title"/> Voeg jouw RiDesign toe <GreenDot
                    className="green-dot-title"/></h2>

                <TextInput
                    type="text"
                    label="Producttitel/ naam"
                    id="productTitle"
                    register={register}
                    errors={errors.title}
                />

                <PhotosUpload
                    register={register}
                    setValue={setValue}
                    values={values}
                    errors={errors}
                />

                <SelectInput
                    id="category"
                    label="Categorie"
                    register={register}
                    placeholder="Selecteer een categorie"
                    options={[
                        {value: 'sofas', label: 'Banken'},
                        {value: 'beds', label: 'Bedden'},
                        {value: 'cabinets', label: 'Kasten'},
                        {value: 'chairs', label: 'Stoelen & fauteuils'},
                        {value: 'tables', label: 'Tafels'},
                        {value: 'garden-furniture', label: 'Tuinmeubelen'}
                    ]}
                    errors={errors.categories}
                />

                <TextInput
                    type="text"
                    id="measurements"
                    label="Afmetingen (lxbxh)"
                    placeholder="Bv. 30cm x 40cm x 50cm"
                    register={register}
                    errors={errors.dimensions}
                />

                <TextInput
                    type="text"
                    id="materials"
                    label="Materialen"
                    placeholder="Bv. Hout, staal"
                    register={register}
                    errors={errors.materials}
                />

                <Textarea
                    id="description"
                    label="Geef een omschrijving"
                    register={register}
                    errors={errors.message}
                />

                <TextInput
                    type="number"
                    id="price"
                    label="Verkoopprijs"
                    placeholder="€ . . , . ."
                    register={register}
                    errors={errors.price}
                    pattern="[0-9]+([,.][0-9]+)?"
                    step="0.01"
                />

                <div className="checkbox-container">
                    <Checkbox
                        id="deliveryOptions"
                        label="Bezorgen"
                        register={register}
                        value="bezorgen"
                    />

                    <Checkbox
                        id="deliveryOptions"
                        label="Ophalen"
                        register={register}
                        value="ophalen"
                    />
                </div>

                <Button text="RiDesign toevoegen" type="submit"/>

            </form>
        </div>
    )
}

export default NewProduct;