"use client";
import React, { useState } from "react";

type TodoInputProps = {
    addTodo: (text: string) => void;
};

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
    const [inputValue, setInputValue] = useState("");

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            addTodo(inputValue);
            setInputValue("");
        }
    };

    return (
        <div className="flex gap-2">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border p-2 flex-grow"
                placeholder="Add a new todo"
            />
            <button
                onClick={handleAddTodo}
                className="bg-blue-500 text-white p-2"
            >
                Add
            </button>
        </div>
    );
};

export default TodoInput;
