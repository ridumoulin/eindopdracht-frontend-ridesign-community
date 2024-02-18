import './SignUp.scss';
import { ReactComponent as GreenDot } from '../../assets/general/green-dot-icon.svg';
import { useForm } from 'react-hook-form';

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
                <h2><GreenDot className="green-dot-title"/> Hey! Hier kun jij je aanmelden!<GreenDot className="green-dot-title"/></h2>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SignUp;