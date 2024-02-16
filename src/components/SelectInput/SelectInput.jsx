import './SelectInput.scss';
import PropTypes from 'prop-types';

function SelectInput(props) {
    return (
        <label htmlFor={props.id}>
            {props.label}
            <select
                id={props.id}
                {...props.register}
                className="category-dropdown"
            >
                <option value="">{props.placeholder}</option>
                {props.options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {props.errors && <span className="error-message">{props.errors.message}</span>}
        </label>
    );
}

SelectInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    errors: PropTypes.object
};

export default SelectInput;