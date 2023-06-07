import React, { useEffect, useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [hoveredTask, setHoveredTask] = useState(null);

  const obtainTasks = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/deborahdobles')
    .then((response) => response.json())
    .then((data) => setTodos(data));
    };

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const trimmedTodo = newTodo.trim();
      if (trimmedTodo.length > 0) {
        const newTodoItem = { label: trimmedTodo, done: false };
        const updatedTodos = todos.concat(newTodoItem);
        setTodos(updatedTodos);
        setNewTodo('');
      }
    }
  };

  const handleUpdate = (list) => {
    if (todos.length > 1){
      fetch('https://assets.breatheco.de/apis/fake/todos/user/deborahdobles', {
      method: "PUT",
      body: JSON.stringify(list),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        if (resp.ok){
          obtainTasks()
        }
    })
    .catch(error => {
        //error handling
        console.log(error);
    });
  } else {
    obtainTasks()
  }
  }
  const handleDelete = (id) => {
    const updatedTodos = todos.slice(id + 1)
    setTodos(updatedTodos);
  };



  useEffect(() => { 
    handleUpdate(todos)
    console.log(todos);
  },[todos] )


  return (
    <div className='text-center'>
      <h1 className='header1'>DEBS' TO DO LIST</h1>
      <div className='container fluid border border-subtle'>
        <input type="text" value={newTodo} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="What needs to be done?"/>
        {todos.length > 0 ? (
          <ul>
            {todos.map((todo, index) => (
              <li
                key={index}
                className={`container border border-subtle ${
                  hoveredTask === index ? 'hovered' : ''
                }`}
                onMouseEnter={() => setHoveredTask(index)}
                onMouseLeave={() => setHoveredTask(null)}
              >
                {todo.label}
                {hoveredTask === index && (
                  <button
                    className='deleteTask' onClick={() => handleDelete(index)}>x
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks, add a task</p>
        )}
        <div className='container fluid border border-subtle d-flex' id='integer'>
          <footer>{todos.length > 0 ? todos.length + " items left" : ""}</footer>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
