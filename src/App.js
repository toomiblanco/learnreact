import React, { useState, useRef, useEffect } from 'react';
import ToDoList from "./ToDoList"
import uuidv4 from "uuid/v4"
import "./style.css"
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  const [todos, setToDos] = useState([])
  const todoNameRef = useRef()
  const LOCAL_STORAGE_KEY = 'todoApp.todos'


  useEffect(() => {

    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setToDos(storedTodos)

  }, [])

  useEffect(() => {

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))

  }, [todos])

  function toggleTodo(id) {

    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setToDos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === "") return
    setToDos(prevTodos => {

      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]

    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {

    const newTodos = todos.filter(todo => !todo.complete)
    setToDos(newTodos)
  }
  return (
    <>
      <div class="container-fluid">

        <center><form>
          <label>Name of the task: </label><br></br>
          <input ref={todoNameRef} type="text" autofocus="autofocus" />
          <br></br>
          <button class="btn btn-primary m-2" onClick={handleAddTodo}>Add To Do</button>
          <button class="btn btn-primary m-2" onClick={handleClearTodos}>Clear Complete To Do's</button>

          <hr></hr>
        </form></center>
        <center><h2>List of To Do's</h2></center>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Name of the task:</th>
              <th scope="col"><center>Action</center></th>

            </tr>
          </thead>
          <ToDoList todos={todos} toggleTodo={toggleTodo} />

        </table>
        <center> <div>{todos.filter(todo => !todo.complete).length} left to do's</div></center>

      </div>
    </>
  )

}

export default App;
