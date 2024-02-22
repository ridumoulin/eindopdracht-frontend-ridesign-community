import './SignUp.scss';
import { ReactComponent as GreenDot } from '../../assets/general/green-dot-icon.svg';
import { useForm } from 'react-hook-form';
import TextInput from "../../components/TextInput/TextInput.jsx";
import PasswordInput from "../../components/PasswordInput/PasswordInput.jsx";
import Checkbox from "../../components/Checkbox/Checkbox.jsx";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        criteriaMode: 'all'
    });

    const navigate = useNavigate();
    const baseUrl = 'http://localhost:5432';

    function handleFormSubmit(data) {
        signUp(data);
    }

    async function signUp(data) {
        try {
            const response = await axios.post(`${baseUrl}/register`, data);
            console.log("User registered successfully:", response.data);
        } catch (error) {
            console.error("Error registering user:", error.response.data);
        } finally {
            navigate('/signin')
        }
    }


    return (
        <div className="outer-container-sign-up">
            <form className="form-sign-up" onSubmit={handleSubmit(handleFormSubmit)}>
                <h2><GreenDot className="green-dot-title"/> Hey! Hier kun jij je aanmelden! <GreenDot className="green-dot-title"/></h2>

                <TextInput
                    type="email"
                    id="email"
                    label="E-mail"
                    register={register}
                    validate={(value) => value.includes('@')}
                    errors={errors.email}
                />

                <PasswordInput
                    type="password"
                    id="password"
                    label="Wachtwoord"
                    register={register}
                    errors={errors.password}
                />

                <TextInput
                    type="text"
                    id="firstname"
                    label="Voornaam"
                    register={register}
                    errors={errors.firstname}
                />

                <TextInput
                    type="text"
                    id="lastname"
                    label="Achternaam"
                    register={register}
                    errors={errors.lastname}
                />

                <TextInput
                    type="text"
                    id="username"
                    label="Gebruikersnaam"
                    register={register}
                    errors={errors.username}
                />

                <div className="checkbox-container-ri-designer">
                    <Checkbox
                        id="isRiDesigner-checkbox"
                        label="Ben jij een RiDesigner?"
                        register={register("delivery")}
                        value="yes"
                    />
                </div>

                <button type="submit">Aanmelden</button>
            </form>
        </div>
    );
}
export default SignUp;