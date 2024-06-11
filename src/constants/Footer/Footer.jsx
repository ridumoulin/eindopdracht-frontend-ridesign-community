import './Footer.scss';
import { ReactComponent as GreenDot } from '../../assets/general/green-dot-icon.svg';
import { ReactComponent as InstaLogo} from '../../assets/general/instagram-logo.svg';

function Footer() {
    return (
        <footer className="outer-container-footer">
            <section className="footer-up">
                <div className="footer-up-left">
                    <a href="https://www.instagram.com/ridesign_studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                        <InstaLogo className="insta-logo-footer" />
                    </a>
                </div>

                <div className="footer-up-right">
                    <GreenDot className="green-dot-footer" />
                    <div>
                        <p>Contact</p>
                        <p>info@ridesigncommunity.com</p>
                    </div>
                </div>


            </section>
            <section className="footer-down">
                    <p>Alle rechten voorbehouden - © 2024 RiDesign Community</p>
            </section>
        </footer>
    );
}

export default Footer;