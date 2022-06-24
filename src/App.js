import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm.js';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  const [taskData, setTaskData] = useState([]);

  const URL = 'https://task-list-api-c17.herokuapp.com/tasks';

  const fetchTasks = () => {
    axios
      .get(URL)
      .then((res) => {
        console.log(res.data);
        const newTasks = res.data.map((task) => {
          return {
            id: task.id,
            title: task.title,
            isComplete: task.is_complete,
          };
        });
        setTaskData(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(fetchTasks, []);

  const updateData = (id, isComplete) => {
    
    let path = `${URL}/${id}/mark_complete`;
    if (isComplete) {
    path =`${URL}/${id}/mark_incomplete`}
    axios
      .patch(path)
      .then(() => {
        const newTasks = [];
        for (const task of taskData) {
          const newTask = { ...task };
          if (newTask.id === id) {
            newTask.isComplete = !newTask.isComplete;
          }
          newTasks.push(newTask);
        }
        setTaskData(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
};


  const deleteTask = (id) => {
    axios
      .delete(`${URL}/${id}`)
      .then(() => {
        const newTasks = [];
        for (const task of taskData) {
          if (task.id !== id) {
            newTasks.push(task);
          }
        }
        setTaskData(newTasks);
       })
       .catch((err) => {
          console.log(err);
      });
  };
const addTask = (taskInfo) => {
  axios.post(URL, taskInfo)
  .then((res) => {
    fetchTasks();
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });
 };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={taskData}
            onUpdate={updateData}
            deleteCallBack={deleteTask}
          ></TaskList>
          <TaskForm addTaskCallBack = {addTask}></TaskForm>
        </div>
      </main>
    </div>
  );
};


export default App;
