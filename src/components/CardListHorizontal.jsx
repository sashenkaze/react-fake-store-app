
import { Card } from "flowbite-react";
import { Button, ButtonGroup } from "flowbite-react"
import { useContext } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export function CardListHorizontal({ data, mode = "cart", children }) {
    const { changeQty, deleteAll, deleteItem } = useContext(CartContext);
    const navigate = useNavigate();

    // 
    const hasItem = Array.isArray(data) && data.length > 0;

    function handleCheckout() {
        navigate("/checkout");
    }

    return (
        <Card className="block mx-auto my-25 w-4xl">
            <div className="mb-4 flex items-center justify-between">
                <h5 className="text-xl font-bold text-gray-900 dark:text-white">
                    {mode === "checkout" ? "Checkout" : "Keranjang"}
                </h5>
z
                {mode === "cart" && data.length >= 1 && (
                    <p className="text-sm font-medium text-cyan-600 hover:underline dark:text-red-500" onClick={deleteAll}>
                        Hapus Semua
                    </p>
                )}
            </div>
            <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {
                        data.map((item, index) => (
                            <li className="py-3 sm:py-4" key={index}>
                                <div className="flex items-center space-x-4">
                                    <div className="shrink-0">
                                        <img
                                            alt="Neil image"
                                            height="32"
                                            src={item.image}
                                            width="50"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">{item.qty}</p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">${item.price}</div>
                                </div>
                                {mode === "cart" && (
                                    <div className="flex justify-end mt-4">
                                        <ButtonGroup>
                                            <Button color="default" className="px-3 py-0" onClick={() => changeQty(item.id, "-")}>
                                                <FaMinus className="w-3 h-3" />
                                            </Button>
                                            <Button color="alternative" className="px-3 py-0">{item.qty}</Button>
                                            <Button color="default" className="px-3 py-0" onClick={() => changeQty(item.id, "+")}>
                                                <FaPlus className="w-3 h-3" />
                                            </Button>
                                        </ButtonGroup>
                                        <FaTrash className="text-2xl ms-4 mt-2 text-red-500" onClick={() => deleteItem(item.id)} />
                                    </div>
                                )}
                            </li>
                        ))
                    }
                </ul>
            </div>
            {hasItem && mode === "cart" && (
                <div className="flex justify-end mt-6">
                    <Button color="green" onClick={handleCheckout}>
                        Checkout
                    </Button>
                </div>
            )}

            {mode === "checkout" && hasItem && (
                <>
                    <hr className="my-6 border-gray-300 dark:border-gray-600" />
                    {children}
                </>
            )}

        </Card>
    );
}
