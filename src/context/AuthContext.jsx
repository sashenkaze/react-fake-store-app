import { createContext, useState } from "react";

export const AuthContext = createContext();

// membuat context
// const AuthContext = createContext();

// menyimpan proses data yg akan dibuat global (bisa diakses di file yang mana aja)

export default function AuthProvider({children}) {
    const [isLogin, setIsLogin] = useState(localStorage.getItem('access_token'));

    function logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setIsLogin(false);  
    }

    function login() {
        // udah state isLogin jadi data localstorage, untuk trigger munculnya btn logout di navbar
        setIsLogin(localStorage.getItem("access_token"));
    }

    // mendefinisikan context akan digunakan di pages apa aja
    return(
        // value : data/function yg diperbolehkan akses di global
        <AuthContext.Provider value={{isLogin, logout, login}}>
            {/* kalo gak pake children, perlu manggil satu2 file pages, kalo mau berlaku disemuanya gunakan props children */}
            {children}
        </AuthContext.Provider>
    )
}