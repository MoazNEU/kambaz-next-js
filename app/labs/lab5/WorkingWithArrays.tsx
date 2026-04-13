"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

import { HTTP_SERVER } from "@/app/(kambaz)/httpServer";
export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "Task 1",
    description: "Description for task 1",
    completed: false,
  });
  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a><hr/>
      <h4>Filtering Array Items</h4>
      <a id="wd-retrieve-completed-todos" className="btn btn-primary"
         href={`${API}?completed=true`}>
        Get Completed Todos
      </a><hr/>
      <h4>Creating new Items in an Array</h4>
      <a id="wd-create-todo" className="btn btn-primary"
         href={`${API}/create`}>
        Create Todo
      </a><hr/>
      <h4>Retrieving an Item from an Array by ID</h4>
      <a id="wd-retrieve-todo-by-id" className="btn btn-primary float-end" href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>
      <FormControl id="wd-todo-id" value={todo.id} className="w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
      <hr />
      <h4>Removing from an Array</h4>
      <a id="wd-remove-todo" className="btn btn-primary float-end" href={`${API}/${todo.id}/delete`}>
        Remove Todo with ID = {todo.id}
      </a>
      <FormControl id="wd-remove-todo-id" value={todo.id} className="w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
      <hr />
      <h4>Updating an Item in an Array</h4>
      <a id="wd-update-todo" className="btn btn-primary float-end"
         href={`${API}/${todo.id}/title/${encodeURIComponent(todo.title)}`}>
        Update Todo
      </a>
      <FormControl id="wd-update-todo-id" value={todo.id} className="w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}/>
      <FormControl id="wd-update-todo-title" value={todo.title} className="w-50 float-start"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}/>
      <br /><br /><hr />
      <h4>Completed and description</h4>
      <FormControl as="textarea" rows={2} id="wd-todo-description" className="mb-2"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}/>
      <div className="mb-2">
        <label htmlFor="wd-todo-completed">
          <input id="wd-todo-completed" type="checkbox" className="me-1"
            checked={todo.completed}
            onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}/>
          Completed
        </label>
      </div>
      <a id="wd-update-todo-completed" className="btn btn-primary me-2"
        href={`${API}/${todo.id}/completed/${todo.completed}`}>
        Complete Todo ID = {todo.id}
      </a>
      <a id="wd-update-todo-description" className="btn btn-primary"
        href={`${API}/${todo.id}/description/${encodeURIComponent(todo.description)}`}>
        Describe Todo ID = {todo.id}
      </a>
      <hr />
    </div>
  );
}
