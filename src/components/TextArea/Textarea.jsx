import PropTypes from 'prop-types';

function Textarea(props) {
    return (
        <label htmlFor={props.id}>
            {props.label}
            <textarea
                id={props.id}
                {...props.register}
                className="input-form"
            />
            {props.errors && <span className="error-message">{props.errors.message}</span>}
        </label>
    );
}

Textarea.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.object.isRequired,
    errors: PropTypes.object
};

export default Textarea;