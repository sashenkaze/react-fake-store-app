
import { Outlet } from "react-router-dom"
import NavbarComp from "./components/NavbarComp"
import CartProvider from "./context/CartContext"

export default function Template() {
    return(
        <>
        <CartProvider>
        <NavbarComp />
        {/* menentukan tempat untuk konten dinamis */}
        <Outlet />
        </CartProvider>
        </>
    )
}