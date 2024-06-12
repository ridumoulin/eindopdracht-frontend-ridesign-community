import './Button.scss';
import PropTypes from 'prop-types';


function Button({ text, onClick, type, className }) {
    return (
        <button onClick={onClick} type={type} className={`general-button ${className}`}>
            {text}
        </button>
    );
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
};

Button.defaultProps = {
    onClick: () => {},
    type: "submit"
};

export default Button;