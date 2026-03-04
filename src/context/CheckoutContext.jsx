import { createContext, useState } from "react";

export const CheckoutContext = createContext();

export default function CheckoutProvider({ children }) {
    const [checkoutItems, setCheckoutItems] = useState([]);

    function initCheckout(cart) {
        setCheckoutItems(cart);
    }

    function clearCheckout() {
        setCheckoutItems([]);
    }

    return (
        <CheckoutContext.Provider
            value={{ checkoutItems, initCheckout, clearCheckout }}>
            {children}
        </CheckoutContext.Provider>
    );
}
