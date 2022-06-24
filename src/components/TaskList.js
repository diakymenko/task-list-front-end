import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import './TaskList.css';

const TaskList = ({ tasks, onUpdate, deleteCallBack }) => {
  const getTaskListJSX = (tasks) => {
    return tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          is_complete={task.is_complete}
          onUpdate={onUpdate}
          deleteCallBack={deleteCallBack}
        />
      );
    });
  };
  return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      is_complete: PropTypes.bool.isRequired,
    })
  ),
  onUpdate: PropTypes.func,
  deleteCallBack: PropTypes.func,
};

export default TaskList;
