import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
            is_complete: task.is_complete,
          };
        });
        setTaskData(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(fetchTasks, []);

  const updateData = (id) => {
    axios
      .patch(`${URL}/${id}/mark_complete`)
      .then(() => {
        const newTasks = [];
        for (const task of taskData) {
          const newTask = { ...task };
          if (newTask.id === id) {
            newTask.is_complete = !newTask.is_complete;
          }
          newTasks.push(newTask);
        }
        setTaskData(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   const tasks = taskData.map((task) => {
  //     if (task.id === updatedTask.id) {
  //       return updatedTask;
  //     } else {
  //       return task;
  //     }
  //   });
  //   setTaskData(tasks);
  // };

  const deleteTask = (id) => {
    const newTasks = [];
    for (const task of taskData) {
      if (task.id !== id) {
        newTasks.push(task);
      }
      setTaskData(newTasks);
    }
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
          />
        </div>
      </main>
    </div>
  );
};

export default App;
