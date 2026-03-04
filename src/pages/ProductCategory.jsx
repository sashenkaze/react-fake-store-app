import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import CardList from "../components/CardList";
import SearchComp from "../components/SearchComp";
import DropdownComp from "../components/DropdownComp";
import PaginationComp from "../components/PaginationComp";

export default function ProductCategory() {
    const { categoryId } = useParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page) => {
        setCurrentPage(page);
        getProducts();
    };

    function processSearch(event) {
        const value = event.target.value;
        setSearch(value);

        const url =
            "https://api.escuelajs.co/api/v1/products" +
            "?categoryId=" + categoryId +
            "&title=" + value;

        setLoading(true);
        getProducts(url);
    }


    async function getProducts(
        url =
            "https://api.escuelajs.co/api/v1/products" +
            "?categoryId=" + categoryId +
            "&limit=8" +
            "&offset=" + currentPage
    ) {
        try {
            const response = await fetch(url);
            const result = await response.json();
            setProducts(result);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    }


    function processSort(type) {
        // console.log(type);
        // copy isi products ke nama baru agar terdeteksi di setProducts untuk memunculkan tampilan produk baru (sesuai hasil sort)
        let productNew = [...products];

        if (type === "harga termurah") {
            productNew.sort((a, b) => a.price - b.price);
        } else if (type === "harga termahal") {
            productNew.sort((a, b) => b.price - a.price);
        } else if (type === "alfabet menurun") {
            productNew.sort((a, b) =>
                a.title.toLowerCase().localeCompare(b.title.toLowerCase())
            );
        } else if (type === "alfabet menaik") {
            productNew.sort((a, b) =>
                b.title.toLowerCase().localeCompare(a.title.toLowerCase())
            );
        }

        setProducts(productNew);
    }

    useEffect(() => {
        getProducts();
    }, [categoryId]);

    return (
        <div className="px-10 py-5">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-5">
                    Produk Kategori {products?.[0]?.category?.name}
                </h1>

                <div className="flex gap-2 mb-5">
                    <SearchComp processSearch={processSearch} />
                    <DropdownComp processSort={processSort} />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center">
                    <Spinner aria-label="Default status example" />
                    <span className="ml-2">Sedang mengambil data...</span>  
                </div>
            ) : (
                <CardList data={products} type="product" />
            )}

            <div className="my-5">
                <PaginationComp
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
}
