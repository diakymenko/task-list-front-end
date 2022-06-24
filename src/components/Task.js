import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, onUpdate, deleteCallBack }) => {
  const completeMe = () => {
    // const updatedTask = {
    //   id: id,
    //   title: title,
    //   isComplete: !is_complete,
    // };
    console.log('calling completeMe');
    onUpdate(id, isComplete);
  };

  const deleteMe = () => {
    deleteCallBack(id);
  };

  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';
  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={(console.log('Clicked Complete'), completeMe)}
      >
        {title}
      </button>

      <button onClick={deleteMe} className="tasks__item__remove button">
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func,
  deleteCallBack: PropTypes.func,
};

export default Task;
