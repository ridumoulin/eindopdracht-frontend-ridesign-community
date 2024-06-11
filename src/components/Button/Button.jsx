import './Button.scss';
import PropTypes from 'prop-types';


function Button({ text, onClick, type }) {
    return (
        <button onClick={onClick} type={type} className="general-button">
            {text}
        </button>
    );
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

Button.defaultProps = {
    onClick: () => {},
    type: "submit"
};

export default Button;