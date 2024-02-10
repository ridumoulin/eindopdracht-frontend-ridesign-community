import './Home.scss';
import achtergrond from '../../assets/home/photo-background.jpg';

function Home() {
    return (
        <div className="outer-container-home">
            <span className="background-wrapper">
                <img src={achtergrond} alt="Achtergrond"/>
            </span>

            <div className="inner-container-home">
                <section>

                </section>

                <section>

                </section>

                <section>

                </section>
            </div>
        </div>
    );
}

export default Home;