import PropTypes from 'prop-types';
import './Checkbox.scss';

function Checkbox(props) {
    const { id, label, register } = props;
    const selectProps = register(id, { required: true });

    return (
        <div className="content-checkbox">
            <label htmlFor={id} className="checkbox-label">{label}</label>
            <input
                type="checkbox"
                id={id}
                {...selectProps}
                value={props.value}
                className="checkbox"
            />
        </div>
    );
}

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default Checkbox;