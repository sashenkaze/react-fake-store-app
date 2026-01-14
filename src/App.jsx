import BannerComp from "./components/BannerComp"
import NavbarComp from "./components/NavbarComp"
import CardList from "./components/CardList"
import { Button } from "flowbite-react";
import { useState } from "react"

function App() {
	const [categories, setCategories] = useState(['a', 'b', 'c', 'd']);
	const [products, setProducts] = useState(['a', 'b', 'c', 'd']);

	return (
		<>
			<NavbarComp />
			<BannerComp />
			<CardList data={categories} type="category" />
			<CardList data={products} type="product">
				<div className="flex justify-between my-10">
					<h5 className="text-xl font-bold">Daftar Produk Populer</h5>
					<Button className="bg-linear-to-br from-green-400 to-blue-600 text-white hover:bg-linear-to-bl focus:ring-green-200 dark:focus:ring-green-800">Lihat Selengkapnya</Button>
				</div>
			</CardList>
		</>
	)
}

export default App
