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


            </form>
        </div>
    )
}

export default NewProduct;