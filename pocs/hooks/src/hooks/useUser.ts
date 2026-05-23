import { useState, useEffect } from "react";

type User = {
    id: number;
    name: string;
    email: string;
}

function useUser(userId: number) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
            signal: controller.signal
        })
            .then(res => res.json())
            .then((data: User) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err: Error) => {
                if (err.name !== "AbortError") {
                    setError(err);
                    setLoading(false);
                }
            });

        return () => controller.abort();
    }, [userId]);

    return { user, loading, error };
}

export default useUser;