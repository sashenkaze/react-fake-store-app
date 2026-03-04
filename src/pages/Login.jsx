import { Button, Card, Checkbox, Label, TextInput, Spinner } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import ToastFailed from "../components/ToastFailed";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function submitForm() {
        if (form.email == "" || form.password == "") {
            setError("Gagal! Email dan password tidak boleh kosong.");
        } else {
            setLoading(true);
            processLogin();
        }
    }

    async function processLogin() {
        const url = "https://api.escuelajs.co/api/v1/auth/login";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // Automatically converted to "username=example&password=password"
                body: JSON.stringify(form),
                // …
            });

            const result = await response.json();
            if(!result.access_token) {
                throw new Error("Email dan password tidak sesuai");
            }

            localStorage.setItem("access_token", result.access_token);
            localStorage.setItem("refresh_token", result.refresh_token);
            
            setError("");

            login();
            // pindahkan ke halaman keranjang 
            navigate("/cart");

        } catch (error) {
            setError("Gagal login! Email atau password salah.")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            navigate("/cart");
        }
    }, []);

    return (
        <>
            {
                error != "" && (<ToastFailed error={error} />)
            }
            <Card className="max-w-sm w-100 block mx-auto mt-18 py-10">
                <h1 className="text-2xl mb-5 text-center text-white">LOGIN</h1>
                <form className="flex max-w-md flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1">Your email</Label>
                        </div>
                        <TextInput id="email1" type="email" placeholder="sashenka@gmail.com" required
                            // mengubah nilai dari state form bagian email sesuai value input ketika mengetikan data
                            onKeyUp={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1">Your password</Label>
                        </div>
                        <TextInput id="password1" type="password" required onKeyUp={(e) => setForm({ ...form, password: e.target.value })} />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>
                    {
                        loading ? (<Button disabled>
                            <Spinner /> memproses login...
                        </Button>) : (
                            <Button type="button" onClick={submitForm}>Login</Button>
                        )
                    }
                </form>
            </Card>
        </>
    )
}