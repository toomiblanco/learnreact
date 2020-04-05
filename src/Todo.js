import React from 'react'

export default function todo({ todo, toggleTodo }) {
    function handleTodoClick() {

        toggleTodo(todo.id)

    }
    return (



        <tbody>
            <tr>
                <td> {todo.name}</td>

                <td><center><input type="checkbox" checked={todo.complete} onChange={handleTodoClick}></input></center></td>
            </tr>
        </tbody>


    )
}
