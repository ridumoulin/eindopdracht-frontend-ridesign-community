import PropTypes from 'prop-types';
import './TextInput.scss';

function TextInput(props) {

    const { id, register, type, placeholder } = props;
    const inputProps = register(id, { required: true });

    const pattern = type === "number" ? "[0-9]+([,.][0-9]+)?" : undefined;

    return (
        <label htmlFor={props.id}>
            {props.label}
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                {...inputProps}
                pattern={pattern}
                step={type === "number" ? "0.01" : undefined}
                className="input-form"
            />
            {props.errors && <span className="error-message">{props.errors.message}</span>}
        </label>
    );
}

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    errors: PropTypes.object,
    type: PropTypes.oneOf(['text', 'email', 'number']).isRequired,
    validate: PropTypes.func
};


export default TextInput;