import { ReactComponent as PlusIcon } from '../../assets/general/plus-icon.svg';
import PropTypes from 'prop-types';
import './PhotoUpload.scss';

function PhotoUpload(props) {
    const { values, setValue, register, errors } = props;

    const handleFileChange = (index, e) => {
        const newFiles = [...values];
        newFiles[index] = e.target.files[0];
        setValue(newFiles);
    };

    return (
        <div className="photo-upload-container">
            {console.log(values)}
            <p>Foto&apos;s uploaden</p>
            <div className="upload-content-container">
                {[0, 1, 2].map((index) => (
                    <div key={index} className={`photo-placeholder ${values[index] instanceof File ? 'uploaded-photo' : ''}`}>
                        {values[index] instanceof File ? (
                            <div className="wrapper-upload-photo">
                                <img
                                    src={URL.createObjectURL(values[index])}
                                    alt={`Uploaded photo ${index + 1}`}
                                />
                            </div>
                        ) : (
                            <label htmlFor={`photo${index}-field`}>
                                <input
                                    type="file"
                                    id={`photo${index}-field`}
                                    {...register(`photos.${index}`, {
                                        required: true
                                    })}
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(index, e)}
                                    required
                                />
                                <PlusIcon className="plus-icon" />
                            </label>
                        )}
                    </div>
                ))}
            </div>
            {errors && <span className="error-message">{errors.message}</span>}
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


