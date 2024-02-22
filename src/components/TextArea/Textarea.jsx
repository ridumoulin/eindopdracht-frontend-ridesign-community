import PropTypes from 'prop-types';
import './Textarea.scss';

function Textarea(props) {
    const { id, register, placeholder } = props;
    const textareaProps = register(id, {
        required: true,
        minLength: 30,
        maxLength: 200,
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
            {props.errors && <span className="error-message">{props.errors.message}</span>}
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