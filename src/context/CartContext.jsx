import { Children, createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({children}) {
    const [cart, setCart] = useState([]);

    function addToCart(product, qty) {
        setCart((prev) => {
            // cek jika produk yg dipilih sudah ada di state cart, update qty nya saja
            const exist = prev.find((item) => item.id == product.id);
            if (exist) {
                // looping data cart, temukan id yang dimaksud, update qty nya
                return prev.map((item) => {
                    if (item.id == product.id) {
                        return {...item, qty: item.qty + qty}
                    } else {
                        // kalo item yg di loop ini bukan id yang dimaksud, ga di update apa-apa isinya
                        return item;
                    }
                })
            } else {
                // kalau product.id gak ada di cart state, isi data objek baru ke arr state cart
                return [
                    ...prev, {
                        id: product.id,
                        title: product.title,
                        image: product.images ? product.images[0] : '',
                        price: product.price,
                        qty: qty
                    }
                ]
            }
        });
    }

    // debugging, cek data cart masuk apa nggak
    // useEffect(() => {
    //     console.log(cart)
    // }, [cart]);

    function changeQty(productId, type){
        setCart((prev) => {
            // loop data cart, cari data id yang sesuai, update qty nya
            return prev.map((item) => {
                if(item.id === productId) {
                    if(type == "+"){
                        return{...item, qty: item.qty + 1}
                    } else{
                        if (item.qty > 1) {
                            return{...item, qty: item.qty - 1}
                        } else {
                            return item;
                        }
                    }
                } else {
                    return item; // jika id loop bukan productId diminta, tidak diubah
                }
            });
        })
    }

    function deleteAll() {
        setCart([]);
    }

    function deleteItem(productId) {
        setCart((prev) => {
            // ambil item yg id nya selain yang diminta, hilangkan yang diminta
            return prev.filter((item) => item.id != productId);
        })
    }

    return (
        <CartContext.Provider value={{cart, addToCart, changeQty, deleteAll, deleteItem}}>
            {children}
        </CartContext.Provider>
    )
}