import { Todo } from "../types/Todo";

const TODOS_KEY = "todos";

export const saveTodos = (todos: Todo[]): void => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};

export const loadTodos = (): Todo[] => {
    const storedTodos = localStorage.getItem(TODOS_KEY);
    if (!storedTodos) return [];

    try {
        return JSON.parse(storedTodos);
    } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
        return [];
    }
};
