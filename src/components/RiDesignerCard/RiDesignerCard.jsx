import PropTypes from 'prop-types';
import './RiDesignerCard.scss';

function RiDesignerCard({ username, image }) {
    return (
        <div className="ridesign-card-wrapper">
            <section className="photo-designer-wrapper">
                {image ? (
                    <img src={image} alt={username} className="ridesigner-card-photo" />
                ) : (
                    <p>Geen foto beschikbaar</p>
                )}
            </section>
            <section className="designer-name">
                <p className="designer-product">{username}</p>
            </section>
        </div>
    );
}

RiDesignerCard.propTypes = {
    username: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

export default RiDesignerCard;