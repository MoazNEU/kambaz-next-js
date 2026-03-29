"use client";
import React, { useState, useEffect } from "react";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import * as client from "./client";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadTodos = async () => {
    const data = await client.fetchTodos();
    setTodos(data);
  };

  const editTodo = (todo: any) => {
    setTodos((prev) =>
      prev.map((t) =>
        Number(t.id) === Number(todo.id) ? { ...t, editing: true } : t
      )
    );
  };

  const updateTodo = async (todo: any) => {
    try {
      const { editing, ...rest } = todo;
      await client.updateTodo({
        id: rest.id,
        title: rest.title,
        completed: rest.completed,
        description: rest.description ?? "",
      });
      setErrorMessage(null);
      setTodos((prev) =>
        prev.map((t) => (Number(t.id) === Number(todo.id) ? todo : t))
      );
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message ??
          error.message ??
          "Request failed"
      );
    }
  };

  const removeTodo = async (todo: any) => {
    const updatedTodos = await client.removeTodo(todo);
    setTodos(updatedTodos);
  };

  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      setErrorMessage(null);
      setTodos((prev) => prev.filter((t) => Number(t.id) !== Number(todo.id)));
    } catch (error: any) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.message ??
          error.message ??
          "Request failed"
      );
    }
  };

  const createNewTodo = async () => {
    const list = await client.createNewTodo();
    setTodos(list);
  };

  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: "New Posted Todo",
      completed: false,
    });
    setTodos((prev) => [...prev, newTodo]);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      {errorMessage && (
        <div id="wd-todo-error-message" className="alert alert-danger mb-2 mt-2">
          {errorMessage}
        </div>
      )}
      <h4>
        {" "}
        Todos{" "}
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3 wd-create-todo"
          role="button"
          tabIndex={0}
          id="wd-create-todo"
          style={{ cursor: "pointer" }}
          aria-label="Create new todo (GET)"
        />
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-3 wd-post-todo"
          role="button"
          tabIndex={0}
          id="wd-post-todo"
          style={{ cursor: "pointer" }}
          aria-label="Post new todo (POST)"
        />
      </h4>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            <FaTrash
              onClick={() => removeTodo(todo)}
              className="text-danger float-end mt-1 wd-remove-todo"
              role="button"
              tabIndex={0}
              id={`wd-remove-todo-${todo.id}`}
              style={{ cursor: "pointer" }}
              aria-label={`Remove todo (GET) ${todo.id}`}
            />
            <TiDelete
              onClick={() => deleteTodo(todo)}
              className="text-danger float-end me-2 fs-3 wd-delete-todo"
              role="button"
              tabIndex={0}
              id={`wd-delete-todo-${todo.id}`}
              style={{ cursor: "pointer" }}
              aria-label={`Delete todo (DELETE) ${todo.id}`}
            />
            <FaPencil
              onClick={() => editTodo(todo)}
              className="text-primary float-end me-2 mt-1 wd-edit-todo"
              role="button"
              tabIndex={0}
              id={`wd-edit-todo-${todo.id}`}
              style={{ cursor: "pointer" }}
              aria-label={`Edit todo ${todo.id}`}
            />
            <input
              type="checkbox"
              checked={Boolean(todo.completed)}
              className="form-check-input me-2 float-start"
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
            />
            {!todo.editing ? (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            ) : (
              <FormControl
                className="w-50 float-start"
                value={String(todo.title ?? "")}
                onChange={(e) =>
                  updateTodo({ ...todo, title: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({ ...todo, editing: false });
                  }
                }}
              />
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
