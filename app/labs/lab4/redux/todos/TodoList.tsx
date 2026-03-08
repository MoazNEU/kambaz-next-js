/* eslint-disable @typescript-eslint/no-explicit-any */
//import { useState } from "react";
//import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { RootState } from "../../store";

export default function TodoList() {
    const { todos } = useSelector((state: RootState) => state.todosReducer);

    // const [todos, setTodos] = useState([
    //     { id: "1", title: "Learn React" },
    //     { id: "2", title: "Learn Node" }]);
    // const [todo, setTodo] = useState({ id: "-1", title: "Learn Mongo" });
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const addTodo = (todo: any) => {
    //     const newTodos = [...todos, {
    //         ...todo,
    //         id: new Date().getTime().toString()
    //     }];
    //     setTodos(newTodos);
    //     setTodo({ id: "-1", title: "" });
    // };
    // const deleteTodo = (id: string) => {
    //     const newTodos = todos.filter((todo) => todo.id !== id);
    //     setTodos(newTodos);
    // };
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const updateTodo = (todo: any) => {
    //     const newTodos = todos.map((item) =>
    //         (item.id === todo.id ? todo : item));
    //     setTodos(newTodos);
    //     setTodo({ id: "-1", title: "" });
    // };
    return (
        <div id="wd-todo-list-redux">
            <h2>Todo List</h2>
            <ListGroup>
                <TodoForm />
                {todos.map((todo: any) => (
                    // eslint-disable-next-line react/jsx-key
                    <TodoItem todo={todo} />
                ))}

            </ListGroup >
            <hr />
        </div >);
}