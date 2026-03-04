import BannerComp from "./components/BannerComp"
import CardList from "./components/CardList"
import { Button } from "flowbite-react";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Spinner } from "flowbite-react";
import ModalPaymentComp from "./components/ModalPaymentComp";

function App() {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const [openPaymentModal, setOpenPaymentModal] = useState(false);

	useEffect(() => {
		const success = sessionStorage.getItem("paymentSuccess");
		if (success) {
			setOpenPaymentModal(true);
			sessionStorage.removeItem("paymentSuccess");
		}
	}, []);

	async function getData() {
		const url = "https://api.escuelajs.co/api/v1/categories";
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const result = await response.json();
			setCategories(result.slice(0, 4));
		} catch (error) {
			console.error(error.message);
		}
	}
	
	async function getProducts() {
		const url = "https://api.escuelajs.co/api/v1/products";
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const result = await response.json();
			setProducts(result.slice(0, 4));
			setLoading(false);
		} catch (error) {
			console.error(error.message);
		}
	}

	useEffect(() => {
		getData();
		getProducts();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center mx-auto">
				<Spinner aria-label="Default status example" />
				<span className="ml-2">Sedang mengambil data...</span>
			</div>
		)
	}

	return (
		<>
			<BannerComp />
			<CardList data={categories} type="category" />
			<CardList data={products} type="product">
				<div className="flex justify-between my-10">
					<h5 className="text-xl font-bold">Daftar Produk Populer</h5>
					<Link to="/products">
						<Button className="bg-linear-to-br from-green-400 to-blue-600 text-white hover:bg-linear-to-bl focus:ring-green-200 dark:focus:ring-green-800">Lihat Selengkapnya</Button>
					</Link>
				</div>
			</CardList>
			<ModalPaymentComp
				open={openPaymentModal}
				onClose={() => setOpenPaymentModal(false)}
			/>

		</>
	)
}

export default App
