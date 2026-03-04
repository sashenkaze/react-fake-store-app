import { useContext, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { CardListHorizontal } from "../components/CardListHorizontal";

export default function Checkout() {
    const { cart, deleteAll } = useContext(CartContext);
    const navigate = useNavigate();

    const isFinishingPayment = useRef(false);
    
    useEffect(() => {
        if (!cart || cart.length === 0) {
            if (!isFinishingPayment.current) {
                navigate("/cart");
            }
        }
    }, [cart, navigate]);   
    
    const totalProduct = cart.reduce(
        (total, item) => total + item.price * item.qty,
        0
    );

    const appFee = totalProduct * 0.05;
    const totalPay = totalProduct + appFee;

    function handleFinishPayment() {
        isFinishingPayment.current = true;
        sessionStorage.setItem("paymentSuccess", "true");
        deleteAll();
        navigate("/");
    }


    return (
        <CardListHorizontal data={cart} mode="checkout">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
                <h3 className="text-lg font-semibold mb-4 text-white">
                    Detail Pembayaran
                </h3>

                <div className="flex justify-between mb-2">
                    <span className="text-white">Total Harga Produk</span>
                    <span className="text-white">
                        ${totalProduct.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between mb-2">
                    <span className="text-white">Biaya Aplikasi</span>
                    <span className="text-white">
                        ${appFee.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between font-bold text-lg mt-4">
                    <span className="text-white">Total Harga Bayar</span>
                    <span className="text-white">
                        ${totalPay.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-end mt-6">
                    <Button color="blue" onClick={handleFinishPayment}>
                        Selesaikan Pembayaran
                    </Button>
                </div>
            </div>
        </CardListHorizontal>
    );
}
