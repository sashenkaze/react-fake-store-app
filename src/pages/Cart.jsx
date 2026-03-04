import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { CardListHorizontal } from "../components/CardListHorizontal";

export default function Cart() {
    const {cart} = useContext(CartContext);
    return (
        <div>
            <CardListHorizontal data={cart}/>
        </div>
    )
}