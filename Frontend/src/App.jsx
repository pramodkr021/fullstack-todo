import { useEffect, useState } from "react"
import { AddTask } from "./components/AddTask"
import { Task } from "./components/Task"
import { getAllTask, addTask, updateTask, deleteTask, completeTask } from "./api"
import Search from "./components/Search"
import "./App.css";

function App() {
  const [taskList, setTaskList] = useState([])

  useEffect(() => {
    getAllTask().then(result => setTaskList(result.data.data))
  }, [])

  function handleSubmit(task) {
    addTask(task).then((response) => {
      const newTask = response.data.data
      setTaskList(prev => [...prev, newTask])
    })
  }

  function handleUpdate(id, updatedTaskValue) {
    updateTask(id, updatedTaskValue).then(response => {
      const updatedTask = response.data.data;

      setTaskList(prev =>
        prev.map(task => task._id === id ? updatedTask : task)
      );
    });
  }

  function handleDelete(id) {
    deleteTask(id).then(() => {
      setTaskList(prev => prev.filter(task => task._id !== id))
    })
  }

  function handleToggle(id) {
    completeTask(id).then(response => {
      const updatedTask = response.data.data;

      setTaskList(prev =>
        prev.map(task =>
          task._id === id ? updatedTask : task
        )
      );
    });
  }


  return (
    <>
      <h1>To-Do List</h1>
      <div className="todo-container">
        <AddTask submit={handleSubmit} />
        <Search onSearch={setTaskList} />
        <ul >
          {taskList.map(task => (
            < Task key={task._id} id={task._id} task={task.task} onUpdate={handleUpdate} onDelete={handleDelete} status={task.completed} onToggle={handleToggle} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
