import { useState } from 'react';
import './Product.scss';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';

function Products() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;

    const handleSortByCategory = (category) => {
        const filteredProducts = products.filter(product => product.category === category);
        setProducts(filteredProducts);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="outer-container-overview-products">
            <div className="overview-product-page">
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
                    <ProductCard products={currentProducts} />

                    {currentPage > 1 && (
                        <button onClick={prevPage}>Previous</button>
                    )}

                    {indexOfLastProduct < products.length && (
                        <button onClick={nextPage}>Next</button>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Products;