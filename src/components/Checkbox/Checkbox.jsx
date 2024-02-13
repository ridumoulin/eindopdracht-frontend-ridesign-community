import PropTypes from 'prop-types';
import './Checkbox.scss';
function Checkbox(props) {
    return (
        <div className="checkbox-container">
            <div className="content-checkbox">
                <label htmlFor={props.id} className="checkbox-label">{props.label}</label>
                <input
                type="checkbox"
                id={props.id}
                {...props.register}
                value={props.value}
                className="checkbox"
                />
            </div>
        </div>
    );
}

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired
};

export default Checkbox;