import './SignIn.scss';
import {useContext} from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import {Link, useNavigate} from 'react-router-dom';
import { ReactComponent as GreenDot } from '../../assets/general/green-dot-icon.svg';
import { useForm } from 'react-hook-form';
import PasswordInput from "../../components/PasswordInput/PasswordInput.jsx";
import TextInput from "../../components/TextInput/TextInput.jsx";
import axios from "axios";

function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        criteriaMode: 'all'
    });

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:8080';

    const handleLogin = async (data) => {
        try {
            const response = await axios.post(`${baseUrl}/authenticate`, data);
            const { token } = response.data;
            await authContext.login(token);
            navigate('/profile');
        } catch (error) {
            console.error("Error met inloggen:", error.response.data);
        } finally {
            navigate('/profile')
        }
    };

    return (
        <div className="outer-container-sign-in">
            <form className="form-sign-in" onSubmit={handleSubmit(handleLogin)}>
                <h2><GreenDot className="green-dot-title"/> Daar ben je weer! <GreenDot className="green-dot-title"/></h2>
                <p>Nog geen account? Die kan <Link className="link-to-sign-up" to="/sign-up">hier</Link> aangemaakt worden</p>

                <TextInput
                    type="email"
                    id="email"
                    label="E-mail"
                    register={register}
                    placeholder="Vul hier je e-mail in"
                    validate={(value) => value.includes('@')}
                    errors={errors.email}
                />

                <PasswordInput
                    id="password"
                    label="Wachtwoord"
                    register={register}
                    placeholder="Vul hier je wachwoord in"
                    errors={errors.password}
                />
                <button type="submit">Inloggen</button>
            </form>
        </div>
    );
}

export default SignIn;