import './Error.scss';
import { ReactComponent as GreenDot } from '../../assets/general/green-dot-icon.svg';

function Error() {
    return (
        <div className="outer-container-error">
            <div className="content-error">
                <h2><GreenDot className="green-dot-title"/> Er is helaas iets mis gegaan, u kunt hier terug terug naar de hoofdpagia. <GreenDot className="green-dot-title"/></h2>
            </div>
        </div>
    )
}

export default Error;