import './Home.scss';
import background from '../../assets/home/photo-background.jpg';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="outer-container-home">
            <span className="background-wrapper">
                <h1 className="home-title">R<span className="title-lowercase-letter">i</span>Design</h1>
                <p className="second-home-title">Community</p>
                <img src={background} alt="Achtergrond"/>
            </span>

            <div className="inner-container-home">
                <section className="section-background">
                    <p className="text-products">Op zoek naar duurzaam design?</p>
                    <Link to="/products">
                        <button className="button-home-one">Producten</button>
                    </Link>
                </section>

                <section className="section-background">
                    <p className="text-ridesign">Ben jij een RiDesigner?</p>
                    <Link to="/new-product">
                        <button className="button-home-two">Verkopen</button>
                    </Link>
                </section>

                <section className="section-background">
                    <p className="text-contact">Aanvraag of inleveren?</p>
                    <Link to="/inquiries">
                        <button className="button-home-three">Contact</button>
                    </Link>
                </section>
            </div>
        </div>
    );
}

export default Home;