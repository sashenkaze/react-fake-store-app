import CardComp from "./CardComp";
import CardCommerce from "./CardCommerce";
import { useContext, useState } from "react";
import ModalCartComp from "./ModalCartComp";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function CardList({ data, type, children }) {
    const [openModal, setOpenModal] = useState(false);
    const { addToCart } = useContext(CartContext);

    const [selected, setSelected] = useState({});

    function updateSelected(item) {
        setSelected(item);
        setOpenModal(true);
    }

    function handleClose() {
        setOpenModal(false);
    }

    const navigate = useNavigate();
    const { isLogin } = useContext(AuthContext);

    function handleBtnKeranjang(product, qty){
        // jika islogin dari auth nya false, arahkan ke halaman login
        if(!isLogin) {
            navigate("/login")
        }
        addToCart(product, qty);
        setOpenModal(false);
    }

    return(
        <>
        <div className="block mx-auto w-4xl">
            {children}
            <div className="grid grid-cols-4 gap-4 mb-10">
                {
                    data.map((item, index) => type == "category" ? (<CardComp key={index} item={item} />) : (<CardCommerce key={index} item={item} updateSelected={updateSelected} />))
                }
            </div>
        </div>
        <ModalCartComp item={selected} handleClose={handleClose} openModal={openModal} handleBtnKeranjang={handleBtnKeranjang}/>
        </>
    )
}