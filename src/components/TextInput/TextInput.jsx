import PropTypes from 'prop-types';

function TextInput(props) {
    return (
        <label htmlFor={props.id}>
            {props.label}
            <input
                type="text"
                id={props.id}
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
    errors: PropTypes.object
};


export default TextInput;