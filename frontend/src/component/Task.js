import React from 'react'
import './Task.css';
import {MdOutlineDeleteForever,MdEditNote} from 'react-icons/md';


const Task = ({index,tasks, onDelete, onUpdate}) => {
  
  const handleDelete = () => {
    onDelete(tasks._id);
  };
    
    const handleUpdate = () => {
      const updatedData = prompt('Enter updated task details:'); 
      onUpdate(tasks._id, updatedData);
    };


  return (
    <div className='task'>
        <p> {index+1} <b>{tasks.name}</b></p>
        <div className='task-icons'>
            <MdEditNote onClick={handleUpdate}/>
            <MdOutlineDeleteForever  onClick={handleDelete}/>
        </div>
        
        
    </div>
  )
}

export default Task