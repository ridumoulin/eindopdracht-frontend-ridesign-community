import './SignUp.scss';
import { ReactComponent as GreenDot } from '../../assets/general/green-dot-icon.svg';
import { useForm } from 'react-hook-form';
import TextInput from "../../components/TextInput/TextInput.jsx";
import PasswordInput from "../../components/PasswordInput/PasswordInput.jsx";
import Checkbox from "../../components/Checkbox/Checkbox.jsx";

function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        criteriaMode: 'all'
    });

    const onSubmit = (data) => {
    };

    return (
        <div className="outer-container-sign-up">
            <form className="form-sign-up" onSubmit={handleSubmit(onSubmit)}>
                <h2><GreenDot className="green-dot-title"/> Hey! Hier kun jij je aanmelden! <GreenDot className="green-dot-title"/></h2>

                <TextInput
                    type="type"
                    id="email"
                    label="E-mail"
                    register={register}
                    errors={errors.email}
                />

                <PasswordInput
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