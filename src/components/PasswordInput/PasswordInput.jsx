import PropTypes from 'prop-types';
import './PasswordInput.scss';

function PasswordInput(props) {
    return (
        <label htmlFor={props.id}>
            {props.label}
            <input
                type="password"
                id={props.id}
                placeholder={props.placeholder}
                {...props.register}
                className="input-form"
            />
            {props.errors && <span className="error-message">{props.errors.message}</span>}
        </label>
    );
}

PasswordInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    errors: PropTypes.object
};

export default PasswordInput;