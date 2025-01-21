"use client";
import React from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { IconTrash } from "@tabler/icons-react";
import { Separator } from "../ui/separator";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

type TodoListProps = {
    todos: Todo[];
    removeTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
    children?: React.ReactNode;
};

const TodoList: React.FC<TodoListProps> = ({
    todos,
    removeTodo,
    toggleTodo,
    children,
}) => {
    const uncompletedTodos = todos.filter((todo) => !todo.completed);
    const completedTodos = todos.filter((todo) => todo.completed);

    const renderTodoItem = (todo: Todo) => (
        <li key={todo.id} className="flex items-center gap-2 p-2 border-b">
            <Checkbox
                id={todo.id.toString()}
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
            />
            <Label
                htmlFor={todo.id.toString()}
                className={`font-bold text-base ${
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
    );

    return (
        <div className="flex flex-col gap-4">
            <Card>
                <div className="p-6">{children && children}</div>
                {/* <CardHeader>
                    <CardTitle>Todo</CardTitle>
                </CardHeader> */}
                <CardContent>
                    <ul className="list-none p-0">
                        {uncompletedTodos.map(renderTodoItem)}
                    </ul>
                </CardContent>
            </Card>
            <Separator />
            {completedTodos.length > 0 && (
                <Card className="border-green-400/50 bg-green-400/10">
                    <CardHeader>
                        <CardTitle>Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-none p-0">
                            {completedTodos.map(renderTodoItem)}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default TodoList;
