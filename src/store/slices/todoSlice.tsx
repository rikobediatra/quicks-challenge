import { Todo, TodoState } from "@/interface/todo/todo";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: TodoState = {
    todos: [],
    loading: true,
    error: null
};

// Fetch todo from api
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
    return response.data.map((todo: any) => ({
      ...todo,
      description: '',
      dueDate: new Date().toISOString().split('T')[0], // Example due date
    })) as Todo[];
  });
  
const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload);
        },

        removeTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },

        updateTodo: (state, action: PayloadAction<Todo>) => {
            const {id, title, description, dueDate} = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.title = title,
                todo.description = description,
                todo.dueDate = dueDate
            }
        },

        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
              todo.completed = !todo.completed;
            }
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTodos.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.todos = action.payload;
        })
        .addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch todos';
          }); 
    }
});

export const { addTodo, removeTodo, updateTodo, toggleTodo } = todoSlice.actions;
export const todosReducer = todoSlice.reducer;