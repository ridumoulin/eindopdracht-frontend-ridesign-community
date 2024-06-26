import { useState } from 'react';
import './Inquiries.scss';
import { useForm } from 'react-hook-form';
import { ReactComponent as GreenDot } from '../../assets/general/green-dot-icon.svg';
import SelectInput from '../../components/SelectInput/SelectInput.jsx';
import TextInput from '../../components/TextInput/TextInput.jsx';
import Textarea from '../../components/TextArea/Textarea.jsx';
import axios from 'axios';
import Button from "../../components/Button/Button.jsx";

function Inquiries() {
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        criteriaMode: 'all'
    });

    const newInquiry = async (data) => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        setSubmitting(true);
        try {
            const response = await axios.post('http://localhost:8080/inquiries', data, config);
            setSubmitSuccess(true);
            console.log("Inquiry submitted successfully:", response.data);
        } catch (error) {
            setSubmitError(error.response ? error.response.data : error.message);
            console.error("Error submitting inquiry:", error.response ? error.response.data : error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="outer-container-inquiries">
            <form className="form-inquiries" onSubmit={handleSubmit(newInquiry)}>
                <h2>
                    <GreenDot className="green-dot-title" /> Heb jij een aanvraag voor een RiDesign of heb je een meubelstuk dat je wil inleveren?{' '}
                    <GreenDot className="green-dot-title" />
                </h2>

                <SelectInput
                    id="inquiryType"
                    label="Type verzoek"
                    register={register}
                    options={[
                        { value: 'request', label: 'Aanvraag RiDesign' },
                        { value: 'furniture-drop', label: 'Inleveren meubelstuk' }
                    ]}
                    errors={errors.categories}
                />

                <TextInput
                    id="email"
                    label="E-mail"
                    register={register}
                    type="email"
                    validate={(value) => value.includes('@')}
                    errors={errors.email}
                />

                <Textarea
                    id="description"
                    label="Geef een toelichting"
                    register={register}
                    errors={errors.message}
                />

                <Button type="submit" text={submitting ? 'Verzoek wordt verstuurd...' : 'Verzoek versturen'} />

                {submitSuccess && <p className="message-inquiry" >Aanvraag succesvol verzonden!</p>}
                {submitError && <p>Fout versturen aanvraag: {submitError.message}</p>}
            </form>
        </div>
    );
}

export default Inquiries;