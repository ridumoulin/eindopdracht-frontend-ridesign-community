import './InquiryCard.scss';
import PropTypes from 'prop-types';

function InquiryCard({ inquiryType, email, messageField }) {
    return (
        <div className="inquiry-card-wrapper">
            <h3>Type verzoek: {inquiryType}</h3>
            <p>Email: {email}</p>
            <p>Toelichting: {messageField}</p>
        </div>
    );
}

InquiryCard.propTypes = {
    inquiryType: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    messageField: PropTypes.string.isRequired,
};

export default InquiryCard;