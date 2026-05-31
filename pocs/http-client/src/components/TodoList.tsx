import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import http from "../utils/axiosClient";

type Todo = {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
}

function useTodos() {
    return useQuery({
        queryKey: ["todos"],
        queryFn: () => http.get<Todo[]>("/todos?_limit=10"),
        staleTime: 1000 * 60 * 5,
    });
}

function useTodo(id: number) {
    return useQuery({
        queryKey: ["todo", id],
        queryFn: () => http.get<Todo>(`/todos/${id}`),
        staleTime: 1000 * 60 * 5,
        enabled: !!id,
    });
}

function TodoDetail({ id }: { id: number }) {
    const { data, isLoading } = useTodo(id);

    if (isLoading) return <p>carregando detalhe...</p>;

    return (
        <div>
            <p><strong>{data?.title}</strong></p>
            <p>status: {data?.completed ? "✅ concluído" : "⏳ pendente"}</p>
            <p>usuário: {data?.userId}</p>
        </div>
    );
}

export default function TodoList() {
    const queryClient = useQueryClient();
    const { data: todos, isLoading, error } = useTodos();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    function prefetchTodo(id: number) {
        queryClient.prefetchQuery({
            queryKey: ["todo", id],
            queryFn: () => http.get<Todo>(`/todos/${id}`),
            staleTime: 1000 * 60 * 5,
        });
    }

    if (isLoading) return <p>carregando todos...</p>;
    if (error) return <p>erro: {(error as Error).message}</p>;

    return (
        <div>
            <h2>Todos</h2>

            {todos?.map((todo: Todo) => (
                <div
                    key={todo.id}
                    onMouseEnter={() => prefetchTodo(todo.id)}
                    onClick={() => setSelectedId(todo.id)}
                    style={{ cursor: "pointer" }}
                >
                    <span>{todo.completed ? "✅" : "⏳"}</span>
                    <span>{todo.title}</span>
                </div>
            ))}

            {selectedId && <TodoDetail id={selectedId} />}
        </div>
    );
}