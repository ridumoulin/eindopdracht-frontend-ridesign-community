import './InquiryCard.scss';
import PropTypes from 'prop-types';

function InquiryCard({ inquiryType, email, description, onDelete }) {
    return (
        <div className="inquiry-card-wrapper">
            <div>
                <h4>Type verzoek: {inquiryType}</h4>
                <p>Email: {email}</p>
                <p>Toelichting: {description}</p>
            </div>
            <div>
                <div className="button-deleting-inquiry" onClick={onDelete}>Verwijder</div>
            </div>
        </div>
    );
}

InquiryCard.propTypes = {
    inquiryType: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default InquiryCard;