import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from "../pages/Products";
import Template from "../Template"
import Users from "../pages/Users";
import ProductCategory from "../pages/ProductCategory";
import Login from "../pages/login";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import { auth } from "../middleware/auth";

// membuat daftar routing
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        // mengisi <Outlet /> di Template.jsx
        children: [
            { path: "/", element: <App /> },
            { path: "/products", element: <Products /> },
            { path: "/users", element: <Users />},
            { path: "/categories/:categoryId", element: <ProductCategory />},
            { path: "/login", element: <Login />},  
        ]
    },
    {
        path: "/",
        element: <Template/>,
        loader: auth,
        children: [
            { path: "/cart", element: <Cart />},
            { path: "/checkout", element: <Checkout />}
        ]
    }
]);