import React from "react";

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
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                    />
                    <span className={todo.completed ? "line-through" : ""}>
                        {todo.text}
                    </span>
                    <button
                        onClick={() => removeTodo(todo.id)}
                        className="ml-auto text-red-500"
                    >
                        Remove
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
