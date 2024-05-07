import {useEffect, useState} from 'react';
import './Product.scss';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';

async function fetchImage(base64ImageData) {
    try {
        const arrayBuffer = Uint8Array.from(atob(base64ImageData), c => c.charCodeAt(0)).buffer;
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
        return blob;
    } catch (error) {
        console.error('Error fetching image:', error);
        return null;
    }
}

function Products() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortByPrice, setSortByPrice] = useState(null);
    const productsPerPage = 6;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/products');
                const data = await response.json();
                const productsWithImages = await Promise.all(data.map(async product => {
                    const imageBlobs = await Promise.all(product.images.map(async imageByteArray => {
                        const imageBlob = await fetchImage(imageByteArray);
                        const imageUrl = URL.createObjectURL(imageBlob);
                        return imageUrl;
                    }));
                    return { ...product, images: imageBlobs };
                }));
                setProducts(productsWithImages);
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
                                title={product.productTitle}
                                price={product.price}
                                designer={product.designer}
                                images={product.images}
                            />
                        ))}
                    </div>
                    <div className="buttons-products">
                        <button onClick={prevPage}>Previous</button>
                        <button onClick={nextPage}>Next</button>
                    </div>


                </section>
            </div>
        </div>
    );
}

export default Products;