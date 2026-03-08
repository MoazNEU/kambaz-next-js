import { create } from "zustand";

type Todo = {
    id: string;
    title: string;
};

type TodoDraft = {
    id?: string;
    title: string;
};

type TodoStore = {
    todos: Todo[];
    todo: TodoDraft;
    addTodo: () => void;
    updateTodo: () => void;
    setTodo: (todo: TodoDraft) => void;
    deleteTodo: (todoId: string) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [
        { id: "1", title: "Learn React" },
        { id: "2", title: "Learn Node" },
    ],
    todo: { title: "Learn Mongo" },
    addTodo: () =>
        set((state) => {
            const title = state.todo.title.trim();
            if (!title) {
                return state;
            }
            return {
                todos: [...state.todos, { id: new Date().getTime().toString(), title }],
                todo: { title: "" },
            };
        }),
    updateTodo: () =>
        set((state) => {
            const title = state.todo.title.trim();
            const todoId = state.todo.id;
            if (!todoId || !title) {
                return state;
            }
            return {
                todos: state.todos.map((item) =>
                    item.id === todoId ? { id: todoId, title } : item,
                ),
                todo: { title: "" },
            };
        }),
    setTodo: (todo) => set({ todo }),
    deleteTodo: (todoId) =>
        set((state) => ({
            todos: state.todos.filter((item) => item.id !== todoId),
            todo: state.todo.id === todoId ? { title: "" } : state.todo,
        })),
}));