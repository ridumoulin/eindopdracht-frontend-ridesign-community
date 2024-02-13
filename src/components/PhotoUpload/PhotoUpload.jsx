import { ReactComponent as PlusIcon } from '../../assets/general/plus-icon.svg';
import PropTypes from 'prop-types';

function PhotoUpload(props) {
    const handleFileChange = (index, e) => {
        const files = e.target.files;
        console.log("Files selected:", files);

        if (files.length > 0) {
            const updatedPhotos = [...props.values.photos];
            updatedPhotos[index] = files[0];

            props.setValue('photos', updatedPhotos);

            console.log('Uploaded files:', updatedPhotos);
            updatedPhotos.forEach((photo, idx) => {
                if (photo instanceof File) {
                    console.log(`Uploaded photo ${idx + 1}:`, URL.createObjectURL(photo));
                }
            });
        }
    };

    return (
        <div className="photo-upload-container">
            <p>Foto&apos;s uploaden</p>
            <div className="upload-content-container">
                {props.values.photos.map((photo, index) => (
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
                                    {...props.register(`photos.${index}`, { required: true })}
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
    );
}

PhotoUpload.propTypes = {
    values: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object
};

export default PhotoUpload;


