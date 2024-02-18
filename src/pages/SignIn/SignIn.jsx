import './SignIn.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as GreenDot } from '../../assets/general/green-dot-icon.svg';
import { useForm } from 'react-hook-form';
import PasswordInput from "../../components/PasswordInput/PasswordInput.jsx";
import TextInput from "../../components/TextInput/TextInput.jsx";

function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        criteriaMode: 'all'
    });

    const onSubmit = (data) => {
    };

    return (
        <div className="outer-container-sign-in">
            <form className="form-sign-in" onSubmit={handleSubmit(onSubmit)}>
                <h2><GreenDot className="green-dot-title"/> Daar ben je weer! <GreenDot className="green-dot-title"/></h2>
                <p>Nog geen account? Die kan <Link className="link-to-sign-up" to="/sign-up">hier</Link> aangemaakt worden</p>

                <TextInput
                    type="email"
                    id="email"
                    label="E-mail"
                    register={register}
                    placeholder="Vul hier je e-mail in"
                    errors={errors.email}
                />

                <PasswordInput
                    id="password"
                    label="Wachtwoord"
                    register={register}
                    placeholder="Vul hier je wachwoord in"
                    errors={errors.password}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SignIn;