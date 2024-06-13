import PropTypes from 'prop-types';
import './Textarea.scss';

function Textarea(props) {
    const { id, register, placeholder, errors } = props;
    const textareaProps = register(id, {
        required: true,
        minLength: 50,
        maxLength: 1000,
    });

    return (
        <label htmlFor={id}>
            {props.label}
            <textarea
                id={id}
                {...textareaProps}
                placeholder={placeholder}
                className="textarea-input-form"
            />

            {errors && errors.type === "minLength" && (
                <span className="error-message">Omschrijving moet minimaal uit 50 karakters bestaan</span>
            )}
            {errors && errors.type === "maxLength" && (
                <span className="error-message">Omschrijving mag maximaal uit 50 karakters bestaan</span>
            )}
        </label>
    );
}

Textarea.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    errors: PropTypes.object
};

export default Textarea;