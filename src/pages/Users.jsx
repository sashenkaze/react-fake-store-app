import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

export default function Users() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getUser() {
        try {
            const res = await fetch("https://api.escuelajs.co/api/v1/users/1");
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const data = await res.json();
            setUser(data);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-10">
                <Spinner />
                <span className="ml-2">Mengambil data user...</span>
            </div>
        );
    }

    return <UserCard user={user} />;
}
