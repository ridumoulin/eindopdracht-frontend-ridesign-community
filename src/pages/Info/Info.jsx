import './Info.scss';
import { ReactComponent as GreenDot } from '../../assets/general/green-dot-icon.svg';

function Info() {
    return (
        <div className="outer-container-info">
            <div className="info-page">
                <section className="section-about">
                    <h2><GreenDot className="green-dot-title"/> Over RiDesign Community <GreenDot className="green-dot-title"/></h2>
                    <p>RiDesign Community is voortgebloeid uit RiDesign. RiDesign is in 2023 opgezet door Product Ontwerper Rianne van der Molen en ontstaan uit liefde voor de planeet. Het overtollig consumeren en het materiaal wat daarbij verloren gaat, gaat Rianne naar het hart. Meubels die nog potentie hebben om een nieuw jasje te krijgen zouden niet verloren moeten gaan, volgens Rianne.
                        Aan de hand van die grote afvalstroom aan materialen en haar passie voor design is de studio ontstaan, waarbij Rianne afgedankte meubels omtovert tot een nieuw design. Dit werd vervolgd met de gedachte meerdere mensen te inspireren meubels te RiDesignen, maar daarbij ook de mogelijkheid te geven dit te delen op een platform. Oftwel RiDesign Community.</p>
                </section>
                <section className="section-how-it-works">
                    <h2><GreenDot className="green-dot-title"/> Hoe werkt RiDesign Community? <GreenDot className="green-dot-title"/></h2>
                    <p>Wat betreft RiDesign Community kunt u altijd terecht als designliefhebber om een RiDesign als favoriet te markeren of in het winkelmandje te doen. In het geval je jouw RiDesign wilt toevoegen kunt u bij het aanmelden aangeven dat u een RiDesigner bent en gemakkelijk een nieuw product toevoegen. Tevens kunt u ook een aanvraag doen voor een RiDesign (by Ri) of een meubelstuk inleveren dat door RiDesign gebruikt kan worden voor een nieuw design.</p>
                </section>
            </div>
        </div>
    )
}

export default Info;