import './NewProduct.scss';
import { useForm } from 'react-hook-form';
import { ReactComponent as GreenDot } from '../../assets/general/green-dot-icon.svg';
import { ReactComponent as PlusIcon } from '../../assets/general/plus-icon.svg';

function NewProduct() {

    const { register, handleSubmit, setValue, formState: { errors, values = { photos: ['', '', ''] } } } = useForm({
        mode: 'onChange',
        criteriaMode: 'all'
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleFileChange = (index, e) => {
        const files = e.target.files;
        console.log("Files selected:", files);

        if (files.length > 0) {
            const updatedPhotos = [...values.photos];
            updatedPhotos[index] = files[0];

            setValue('photos', updatedPhotos);

            console.log('Uploaded files:', updatedPhotos);
            updatedPhotos.forEach((photo, idx) => {
                if (photo instanceof File) {
                    console.log(`Uploaded photo ${idx + 1}:`, URL.createObjectURL(photo));
                }
            });
        }
    };

    return (
        <div className="outer-container-new-product" onSubmit={handleSubmit(onSubmit)}>
            <form className="form-new-product">
                <h2><GreenDot className="green-dot-title"/> Voeg jouw RiDesign toe <GreenDot className="green-dot-title"/></h2>

                <label htmlFor="title-field">
                    Producttitel/ naam
                    <input
                        type="text"
                        id="title-field"
                        {...register("title")}
                        className="input-form"
                    />
                    {errors.title && <span className="error-message">Een productnaam of titel is vereist.</span>}
                </label>

                <div className="photo-upload-container">
                    <p>Foto&apos;s uploaden</p>
                    <div className="upload-content-container">
                        {values.photos.map((photo, index) => (
                            <div key={index} className={`photo-placeholder ${photo instanceof File ? 'uploaded-photo' : ''}`}>
                                {photo instanceof File ? (
                                    <div className="wrapper-upload-photo">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt={`Uploaded photo ${index + 1}`}
                                        />
                                    </div>
                                ) : (
                                    <label htmlFor={`photo${index}-field`}>
                                        <input
                                            type="file"
                                            id={`photo${index}-field`}
                                            {...register(`photos.${index}`, { required: true })}
                                            className="input-form-photo"
                                            style={{ display: "none" }}
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(index, e)}
                                        />
                                        <PlusIcon className="plus-icon" />
                                    </label>
                                )}
                            </div>
                        ))}
                    </div>
                </div>


                <label htmlFor="category-select">
                    Categorie
                    <div className="dropdown">
                        <select
                            id="category-select"
                            {...register("categories")}
                            multiple
                            className="category-dropdown"
                            placeholder="selecteer een categorie"

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

                <label htmlFor="dimensions-field">
                    Afmetingen (lxbxh)
                    <input
                        type="text"
                        id="dimensions-field"
                        {...register("dimensions")}
                        className="input-form"
                    />
                    {errors.dimensions && <span className="error-message">De afmetingen zijn vereist.</span>}
                </label>

                <label htmlFor="message-field">
                    Geef een omschrijving
                    <textarea
                        id="message-field"
                        {...register("message")}
                        className="input-form"
                    />
                    {errors.message && <span className="error-message">Een omschrijving is vereist.</span>}
                </label>

                <label htmlFor="materials-field">
                    Materialen
                    <input
                        type="text"
                        id="materials-field"
                        {...register("materials")}
                        className="input-form"
                    />
                    {errors.materials && <span className="error-message">Het aangeven van materialen is vereist.</span>}
                </label>

                <div className="checkbox-container">
                    <div className="content-checkbox">
                        <label htmlFor="delivery-checkbox" className="checkbox-label">Bezorgen</label>
                        <input
                            type="checkbox"
                            id="delivery-checkbox"
                            {...register("delivery")}
                            value="bezorgen"
                            className="checkbox"
                        />
                    </div>

                    <div className="content-checkbox">
                        <label htmlFor="pickup-checkbox" className="checkbox-label">Ophalen</label>
                        <input
                            type="checkbox"
                            id="pickup-checkbox"
                            {...register("pickup")}
                            value="ophalen"
                            className="checkbox"
                        />
                    </div>

                    {errors.delivery && <span className="error-message">Het aangeven van de leveringsoptie is vereist.</span>}
                </div>

                <button type="submit">
                    RiDesign toevoegen
                </button>

            </form>
        </div>
    )
}

export default NewProduct;