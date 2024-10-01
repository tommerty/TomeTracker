import React from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { IconTrash } from "@tabler/icons-react";

type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

type TodoListProps = {
    todos: Todo[];
    removeTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
};

const TodoList: React.FC<TodoListProps> = ({
    todos,
    removeTodo,
    toggleTodo,
}) => {
    return (
        <ul className="list-none p-0">
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    className="flex items-center gap-2 p-2 border-b"
                >
                    <Checkbox
                        id={todo.id.toString()}
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodo(todo.id)}
                    />
                    <Label
                        htmlFor={todo.id.toString()}
                        className={` font-bold text-base ${
                            todo.completed ? "line-through" : ""
                        }`}
                    >
                        {todo.text}
                    </Label>
                    <Button
                        onClick={() => removeTodo(todo.id)}
                        className="ml-auto"
                        variant={"outline"}
                        size={"icon"}
                    >
                        <IconTrash />
                    </Button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
