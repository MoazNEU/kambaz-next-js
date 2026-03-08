"use client";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTodoStore } from "./useTodoStore";

export default function ZustandTodoList() {
    const { todos, todo, addTodo, updateTodo, setTodo, deleteTodo } = useTodoStore(
        (state) => state,
    );

    return (
        <div id="wd-todo-list-zustand">
            <h2>Zustand Todo List</h2>
            <ListGroup>
                <ListGroupItem>
                    <Button onClick={addTodo} id="wd-add-todo-zustand-click">
                        Add
                    </Button>
                    <Button onClick={updateTodo} id="wd-update-todo-zustand-click">
                        Update
                    </Button>
                    <FormControl
                        value={todo.title}
                        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                    />
                </ListGroupItem>
                {todos.map((item) => (
                    <ListGroupItem key={item.id}>
                        <Button
                            onClick={() => deleteTodo(item.id)}
                            id="wd-delete-todo-zustand-click"
                        >
                            Delete
                        </Button>
                        <Button onClick={() => setTodo(item)} id="wd-set-todo-zustand-click">
                            Edit
                        </Button>
                        {item.title}
                    </ListGroupItem>
                ))}
            </ListGroup>
            <hr />
        </div>
    );
}