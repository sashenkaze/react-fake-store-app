import {
    Button,
    Navbar,
    NavbarBrand,
} from "flowbite-react";
import { FcPaid } from "react-icons/fc";
import { CiUser } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom"
import imageLogo from "../assets/image.png"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function NavbarComp() {
    // menggunakan context
    const { isLogin, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    function handleLogout() {
        // panggil funct logout dari context
        logout();
        // pindahkan halaman, navigate tidak bisa digunakan di context
        navigate("/");
    }

    const { cart } = useContext(CartContext);

    return (
        <Navbar fluid rounded className="px-10 py-5 mb-5">
            <NavbarBrand>
                <Link to="/" className="flex items-center gap-1">
                    <img src={imageLogo} color="white" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">FAKE STORE APP</span>
                </Link>
            </NavbarBrand>
            <div className="ml-auto flex md:order-2 items-center gap-6">
                <Link to="/cart" style={{ position: "relative" }}>
                    <span className="bg-red-200 text-red-500 px-2 rounded-full font-bold" style={{ position: "absolute", right: "20px", bottom: "20px" }}>{cart.length}</span>
                    <FcPaid className="scale-125 text-2xl cursor-pointer hover:scale-150 transition" />
                </Link>

                <Link to="/login" className="flex items-center gap-1">
                    <CiUser className="text-2xl cursor-pointer hover:scale-110 transition" color="white" />
                </Link>
                {
                    isLogin && <Button color="red" outline className="ms-3" onClick={handleLogout}>Logout</Button>
                }
            </div>
        </Navbar>
    )
}