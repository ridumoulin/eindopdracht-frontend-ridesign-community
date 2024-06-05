import './NewProduct.scss';
import { useForm } from 'react-hook-form';
import { ReactComponent as GreenDot } from '../../assets/general/green-dot-icon.svg';
import TextInput from "../../components/TextInput/TextInput.jsx";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload.jsx";
import Textarea from "../../components/TextArea/Textarea.jsx";
import Checkbox from "../../components/Checkbox/Checkbox.jsx";
import SelectInput from "../../components/SelectInput/SelectInput.jsx";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function NewProduct() {

    // const [ values, setValue ] = useState([null, null, null])
    const [values, setValue] = useState([{}, {}, {}]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        criteriaMode: 'all'
    });

    function handleFormSubmit(data) {
        newProduct(data);
    }

    const navigate = useNavigate();
    const baseUrl = 'http://localhost:8080';

    async function newProduct(data) {
        const token = localStorage.getItem("token");

        data.photos = values

        try {
            const response = await axios.post(`${baseUrl}/products`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Product created successfully:", response.data);
        } catch (error) {
            console.error("Error creating product:", error.response ? error.response.data : error.message);
        } finally {
            navigate('/profile');
        }
    }

    return (
        <div className="outer-container-new-product">
            <form className="form-new-product" onSubmit={handleSubmit(handleFormSubmit)}>
                <h2><GreenDot className="green-dot-title"/> Voeg jouw RiDesign toe <GreenDot className="green-dot-title"/></h2>

                <TextInput
                    type="text"
                    label="Producttitel/ naam"
                    id="title-field"
                    register={register}
                    errors={errors.title}
                />

                <PhotoUpload
                    register={register}
                    setValue={setValue}
                    values={values}
                    errors={errors}
                />

                <SelectInput
                    id="category-select"
                    label="Categorie"
                    register={register}
                    placeholder="Selecteer een categorie"
                    options={[
                        { value: 'beds', label: 'Banken' },
                        { value: 'tables', label: 'Bedden' },
                        { value: 'sofas', label: 'Kasten' },
                        { value: 'chairs', label: 'Stoelen & fauteuils' },
                        { value: 'tables', label: 'Tafels' },
                        { value: 'garden-furniture', label: 'Tuinmeubelen' }
                    ]}
                    errors={errors.categories}
                />

                <TextInput
                    type="text"
                    id="dimensions-field"
                    label="Afmetingen (lxbxh)"
                    placeholder="Bv. 30cm x 40cm x 50cm"
                    register={register}
                    errors={errors.dimensions}
                />

                <TextInput
                    type="text"
                    id="materials-field"
                    label="Materialen"
                    placeholder="Bv. Hout, staal"
                    register={register}
                    errors={errors.materials}
                />

                <Textarea
                    id="message-field"
                    label="Geef een omschrijving"
                    register={register}
                    errors={errors.message}
                />

                <TextInput
                    type="text"
                    id="price-field"
                    label="Verkoopprijs"
                    placeholder="€ . . , . ."
                    register={register}
                    errors={errors.price}
                />

                <div className="checkbox-container">
                    <Checkbox
                        id="delivery-checkbox"
                        label="Bezorgen"
                        register={register}
                        value="bezorgen"
                    />

                    <Checkbox
                        id="pickup-checkbox"
                        label="Ophalen"
                        register={register}
                        value="ophalen"
                    />
                </div>

                <button type="submit">
                    RiDesign toevoegen
                </button>

            </form>
        </div>
    )
}

export default NewProduct;