import { Todo } from "../types/Todo";

const TODOS_KEY = "todos";

export const loadTodos = (): Todo[] => {
    if (typeof window === "undefined") {
        return [];
    }
    const storedTodos = localStorage.getItem(TODOS_KEY);
    if (!storedTodos) return [];

    try {
        return JSON.parse(storedTodos);
    } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
        return [];
    }
};

export const saveTodos = (todos: Todo[]): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    }
};
