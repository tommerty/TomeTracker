"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleAddTodo();
                    }
                }}
                className="border bg-accent p-2 flex-grow placeholder:text-card-foreground/70 md:text-xl h-auto font-bold ring-0"
                placeholder="Create..."
            />
            <Button onClick={handleAddTodo}>Add</Button>
        </div>
    );
};

export default TodoInput;
