import { ReactComponent as PlusIcon } from '../../assets/general/plus-icon.svg';
import PropTypes from 'prop-types';
import './PhotoUpload.scss';

function PhotoUpload({ value, setValue, register, errors }) {
    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setValue(newFile);
    };

    return (
        <div className="single-photo-upload-container">
            <div className={`single-photo-placeholder ${value instanceof File ? 'uploaded-photo' : ''}`}>
                {value instanceof File ? (
                    <div className="single-wrapper-upload-photo">
                        <img
                            src={URL.createObjectURL(value)}
                            alt="Uploaded photo"
                            className="user-uploaded-photo"
                        />
                    </div>
                ) : (
                    <label htmlFor="photo-field">
                        <input
                            type="file"
                            id="photo-field"
                            {...register('imageData', {
                                required: false
                            })}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={(e) => handleFileChange(e)}
                        />
                        <PlusIcon className="plus-icon" />
                    </label>
                )}
            </div>
            {errors && <span className="error-message">{errors.message}</span>}
        </div>
    );
}

PhotoUpload.propTypes = {
    value: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object
};

export default PhotoUpload;