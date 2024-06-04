import './RiDesigners.scss';
import RiDesignerCard from "../../components/RiDesignerCard/RiDesignerCard.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

function RiDesigners() {
    const [designers, setDesigners] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8080/users`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                const filteredDesigners = response.data.filter(user => user.riDesigner === true);
                setDesigners(filteredDesigners);
            } catch (error) {
                console.error('Error fetching ridesigners:', error);
            }
        };

        fetchData();
    }, []);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="outer-container-ri-designers">
            <div className="content-ridesigners">
                <section className="ridesigners">
                    {designers.map(user => (
                        <RiDesignerCard
                            key={user.email}
                            username={user.username}
                            image={user.imageData ? "data:image/jpeg;base64," + user.imageData.imageData.replace(/"/g, "") : null}
                        />
                    ))}
                </section>
                <section className="buttons-ridesigners">
                    <button onClick={prevPage}>Vorige</button>
                    <button onClick={nextPage}>Volgende</button>
                </section>
            </div>
        </div>
    )
}

export default RiDesigners;