import React, { useState, useEffect } from "react";
import {TodoInput} from "./components/TodoInput";
import {TodoList} from "./components/TodoList";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }));
  }

  function handleAddTodos(newTodo) {
    if (!newTodo.trim()) return;  // Prevent adding empty todos
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleDeleteTodos(index) {
    const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index);
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleEditTodos(index) {
    const todoToBeEdited = todos[index];
    setTodoValue(todoToBeEdited);  // Set value for editing
    const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index); // Remove the item to be edited
    setTodos(newTodoList);
    persistData(newTodoList);
  }

  useEffect(() => {
    const localTodos = localStorage.getItem('todos');
    if (localTodos) {
      const parsedTodos = JSON.parse(localTodos).todos;
      setTodos(parsedTodos || []);
    }
  }, []);

  return (
    <>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        handleEditTodos={handleEditTodos}
        todos={todos}
        handleDeleteTodos={handleDeleteTodos}
      />
    </>
  );
}

export default App;
