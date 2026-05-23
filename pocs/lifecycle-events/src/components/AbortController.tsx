import { useState, useEffect } from "react";

type User = {
    id: number;
    name: string;
    email: string;
}

type UserFetchProps = {
    userId: number;
}

function UserFetch({ userId }: UserFetchProps) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
            signal: controller.signal
        })
            .then((res) => res.json())
            .then((data: User) => setUser(data))
            .catch((err: Error) => {
                if (err.name !== "AbortError") console.error(err);
            });

        return () => controller.abort();
    }, [userId]);

    return <p>{user ? user.name : "carregando..."}</p>;
}

export default UserFetch;