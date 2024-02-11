import './Footer.scss';
import { ReactComponent as GreenDot } from '../../assets/general/green-dot-icon.svg';

function Footer() {
    return (
        <footer className="outer-container-footer">
            <section className="footer-up">

                <GreenDot className="green-dot-footer" />
                <div>
                    <p>Contact</p>
                    <p>info@ridesigncommunity.com</p>
                </div>

            </section>
            <section className="footer-down">
                    <p>Alle rechten voorbehouden - © 2024 RiDesign Community</p>
            </section>
        </footer>
    );
}

export default Footer;