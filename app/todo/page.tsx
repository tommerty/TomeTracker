"use client";

import React, { useState, useEffect } from "react";
import TodoInput from "../../components/todo/ToDoInput";
import TodoList from "../../components/todo/ToDoList";
import { loadTodos, saveTodos } from "../../lib/todoEntryStorage";

type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

const TodoPage = () => {
    const [todos, setTodos] = useState<Todo[]>(() => loadTodos());

    useEffect(() => {
        saveTodos(todos);
    }, [todos]);

    const addTodo = (text: string) => {
        const newTodo = { id: Date.now(), text, completed: false };
        setTodos([...todos, newTodo]);
    };

    const removeTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div className="flex flex-col gap-3 h-full overflow-hidden">
            <TodoInput addTodo={addTodo} />
            <div className="flex flex-col gap-3 overflow-y-auto">
                <TodoList
                    todos={todos}
                    removeTodo={removeTodo}
                    toggleTodo={toggleTodo}
                />
            </div>
        </div>
    );
};

export default TodoPage;
