import './SelectInput.scss';
import PropTypes from 'prop-types';

function SelectInput(props) {
    const { id, label, register, placeholder, options, errors } = props;
    const selectProps = register(id, { required: true });

    return (
        <label htmlFor={id}>
            {label}
            <select
                id={id}
                {...selectProps}
                className="category-dropdown"
            >
                <option value="">{placeholder}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {errors && <span className="error-message">{errors.message}</span>}
        </label>
    );
}

SelectInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
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