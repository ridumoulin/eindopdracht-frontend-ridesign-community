import { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Eye } from '../../assets/general/eye.svg';
import { ReactComponent as EyeSlash } from '../../assets/general/eye-slash.svg';

import './PasswordInput.scss';

function PasswordInput(props) {
    const { id, label, register, placeholder, errors } = props;
    const inputProps = register(id, { required: true, minLength: 8 });
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <label htmlFor={id} className="password-input-container">
            {label}
            <div className="password-input-wrapper">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id={id}
                    placeholder={placeholder}
                    {...inputProps}
                    className="input-form"
                />
                <div className="eye-icon" onClick={togglePasswordVisibility}>
                    {showPassword ? <EyeSlash /> : <Eye />}
                </div>
            </div>
            {errors && errors.message && <span className="error-message">{errors.message}</span>}
            {errors && errors.type === "minLength" && (
                <span className="error-message">Wachtwoord moet minimaal uit 8 karakters bestaan</span>
            )}
        </label>
    );
}

PasswordInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    errors: PropTypes.object
};

export default PasswordInput;