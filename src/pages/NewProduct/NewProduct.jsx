import './NewProduct.scss';
import { useForm } from 'react-hook-form';
import { ReactComponent as GreenDot } from '../../assets/general/green-dot-icon.svg';
import TextInput from "../../components/TextInput/TextInput.jsx";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload.jsx";
import Textarea from "../../components/TextArea/Textarea.jsx";
import Checkbox from "../../components/Checkbox/Checkbox.jsx";

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

                <TextInput label="Producttitel/ naam" id="title-field" register={register("title")} errors={errors.title} />

                <PhotoUpload
                    register={register}
                    setValue={setValue}
                    values={values}
                    errors={errors}
                />


                <label htmlFor="category-select">
                    Categorie
                    <div className="dropdown">
                        <select
                            id="category-select"
                            {...register("categories")}
                            className="category-dropdown"

                        >
                            {/*<option value="">--Selecteer categorie--</option>*/}
                            <option value="beds">Banken</option>
                            <option value="tables">Bedden</option>
                            <option value="sofas">Kasten</option>
                            <option value="chairs">Stoelen & fauteuils</option>
                            <option value="tables">Tafels</option>
                            <option value="garden-furniture">Tuinmeubelen</option>
                        </select>
                    </div>
                </label>

                <TextInput
                    id="dimensions-field"
                    label="Afmetingen (lxbxh)"
                    register={register("dimensions")}
                    errors={errors.dimensions}
                />

                <Textarea
                    id="message-field"
                    label="Geef een omschrijving"
                    register={register("message")}
                    errors={errors.message}
                />

                <TextInput
                    id="materials-field"
                    label="Materialen"
                    register={register("materials")}
                    errors={errors.materials}
                />

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

                <button type="submit">
                    RiDesign toevoegen
                </button>

            </form>
        </div>
    )
}

export default NewProduct;