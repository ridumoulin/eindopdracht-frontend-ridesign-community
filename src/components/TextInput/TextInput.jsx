import PropTypes from 'prop-types';
import './TextInput.scss';

function TextInput(props) {
    return (
        <label htmlFor={props.id}>
            {props.label}
            <input
                type="text"
                id={props.id}
                placeholder={props.placeholder}
                {...props.register}
                className="input-form"
            />
            {props.errors && <span className="error-message">{props.errors.message}</span>}
        </label>
    );
}

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    errors: PropTypes.object
};


export default TextInput;