import React from 'react';

const ListItem = (props) => {
  return <li className="list-group-item">
    <button
      className="btn btn-sm btn-info mr-4"
      onClick={props.editTodo}>
      <i className="fas fa-pen"></i>
    </button>

    {props.item.id}. {props.item.name}

    <button 
      className="btn btn-sm btn-danger ml-4"
      onClick={props.deleteTodo}>
      <i className="fas fa-times"></i>
    </button>
  </li>
}

export default ListItem;
