import {useEffect, useState} from 'react';
import './Product.scss';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import axios from "axios";
import { useLocation } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";

function Products() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortByPrice, setSortByPrice] = useState(null);
    const productsPerPage = 6;
    const location = useLocation();
    const searchResults = location.state && location.state.searchResults;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    const handleSortByCategory = (category) => {
        const filteredProducts = products.filter(product => product.category === category);
        setProducts(filteredProducts);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleSortByPrice = (option) => {
        setSortByPrice(option);
    };

    const sortedProducts = () => {
        let sorted = [...products];
        if (sortByPrice === 'lowToHigh') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortByPrice === 'highToLow') {
            sorted.sort((a, b) => b.price - a.price);
        }
        return sorted.slice(indexOfFirstProduct, indexOfLastProduct);
    };


    return (
        <div className="outer-container-overview-products">
            <div className="overview-products">
                {!searchResults ? (
                    <>
                    <section className="category-options">
                        <ul className="category-menu">
                            <li>
                                <button onClick={() => handleSortByCategory('Banken')}>
                                    Banken
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleSortByCategory('Bedden')}>
                                    Bedden
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleSortByCategory('Kasten')}>
                                    Kasten
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleSortByCategory('Stoelen & Fauteuils')}>
                                    Stoelen & fauteuils
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleSortByCategory('Tafels')}>
                                    Tafels
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleSortByCategory('Tuinmeubelen')}>
                                    Tuinmeubelen
                                </button>
                            </li>
                        </ul>
                    </section>
                    <section className="section-products">
                        <select className="options-sorting-products" onChange={(e) => handleSortByPrice(e.target.value)}>
                            <option value="">Sorteren</option>
                            <option value="lowToHigh">Prijs: laag naar hoog</option>
                            <option value="highToLow">Prijs: hoog naar laag</option>
                        </select>

                        <div className="products">
                            {sortedProducts().map(product => (
                                <ProductCard
                                    key={product.productId}
                                    productId={product.productId}
                                    title={product.productTitle}
                                    price={product.price}
                                    designer={product.username}
                                    images={"data:image/jpeg;base64, " + product.images[0]}
                                />
                            ))}
                        </div>
                        <div className="buttons-products">
                            <Button type="button" onClick={prevPage} text="Vorige" />
                            <Button type="button" onClick={nextPage} text="Volgende" />
                        </div>

                    </section>

                    </>
                ) : (
                    <section className="section-products">
                        <div className="products">
                            {searchResults.map(product => (
                                <ProductCard
                                    key={product.productId}
                                    productId={product.productId}
                                    title={product.productTitle}
                                    price={product.price}
                                    designer={product.username}
                                    images={"data:image/jpeg;base64, " + product.images[0]}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default Products;