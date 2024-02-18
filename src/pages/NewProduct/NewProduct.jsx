import './NewProduct.scss';
import { useForm } from 'react-hook-form';
import { ReactComponent as GreenDot } from '../../assets/general/green-dot-icon.svg';
import TextInput from "../../components/TextInput/TextInput.jsx";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload.jsx";
import Textarea from "../../components/TextArea/Textarea.jsx";
import Checkbox from "../../components/Checkbox/Checkbox.jsx";
import SelectInput from "../../components/SelectInput/SelectInput.jsx";

function NewProduct() {

    const { register, handleSubmit, setValue, formState: { errors, values = { photos: ['', '', ''] } } } = useForm({
        mode: 'onChange',
        criteriaMode: 'all'
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="outer-container-new-product" onSubmit={handleSubmit(onSubmit)}>
            <form className="form-new-product">
                <h2><GreenDot className="green-dot-title"/> Voeg jouw RiDesign toe <GreenDot className="green-dot-title"/></h2>

                <TextInput
                    type="text"
                    label="Producttitel/ naam"
                    id="title-field"
                    register={register("title")}
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
                    register={register("categories")}
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
                    register={register("dimensions")}
                    errors={errors.dimensions}
                />

                <TextInput
                    type="text"
                    id="materials-field"
                    label="Materialen"
                    placeholder="Bv. Hout, staal"
                    register={register("materials")}
                    errors={errors.materials}
                />

                <Textarea
                    id="message-field"
                    label="Geef een omschrijving"
                    register={register("message")}
                    errors={errors.message}
                />

                <TextInput
                    id="price-field"
                    label="Verkoopprijs"
                    placeholder="€ . . , . ."
                    register={register("price")}
                    errors={errors.price}
                />

                <div className="checkbox-container">
                    <Checkbox
                        id="delivery-checkbox"
                        label="Bezorgen"
                        register={register("delivery")}
                        value="bezorgen"
                    />

                    <Checkbox
                        id="pickup-checkbox"
                        label="Ophalen"
                        register={register("pickup")}
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