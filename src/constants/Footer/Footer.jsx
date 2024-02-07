import './Footer.scss';
import logo from '../../assets/nav/logo-small.png'

function Footer() {
    return (
        <footer className="outer-container-footer">
            <div className="inner-container-footer">
                <img className="logo-footer" src={logo} alt="Logo RiDesign"/>
            </div>
        </footer>
    );
}

export default Footer;