import React, { useEffect, useState } from 'react'
import Form from './Form'
import Task from './Task'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import URL from "../App"
const TaskList = () => {
  const [formData, setFormData] = useState({name:''})
  const {name} = formData
  const [TaskID, setTaskID] = useState('')
  const [tasks, setTask] = useState([])

  //This function updates the formData state when input values change. It's used as an event handler for the form input changes.
  const handleInputChange = (e)=>{
    const {name,value} =e.target
    setFormData({...formData,[name]:value})
  }
  /*create a task 
    This function is called when the form is submitted. It makes a POST request to create a new task using axios.post, resets the form, 
    logs the form data, and then calls getAllTask to refresh the task list.
  */
  const createTask=async(e)=>{
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/tasks', formData)
      setFormData({name:''})
      console.log(formData);
      getAllTask()
      toast.success('Task Entered Succesfully');

    } catch (error) {
      // console.log(error)
      console.error('Error creating task:', error.message);
      toast.error('Problem Adding Task');
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server response:', error.response.data);
        console.error('Status code:', error.response.status);
      }
    
    }
  }
  /* 
    This function makes a GET request to fetch all tasks from the server and updates the tasks state
  */
  const getAllTask = async()=>{
    try {
      const{data}=await axios.get("http://localhost:8000/api/tasks")
      setTask(data)
    } catch (error) {
      console.log(error);
    }
  }
    useEffect(()=>{
      getAllTask()
    },  [])

    //Function to delete a task
    const deleteTask = async (taskId) => {
      try {
        await axios.delete(`http://localhost:8000/api/tasks/${taskId}`);
        getAllTask(); // Refresh the task list after deletion
        toast.success('Task deleted successfully!');
      } catch (error) {
        console.log(error);
        toast.error('Error deleting task');
      }
    };
    
    

    //Function to update a task
    const updateTask = async (taskId,updatedData) => {
      try {
        await axios.put(`http://localhost:8000/api/tasks/${taskId}`, { name: updatedData });
        getAllTask();
        toast.success(' Task Updated Successfully');
      } catch (error) {
        console.log(error);
        toast.error('Error updating task');
      }
    };
  
  return (
    <div>
       <h1 className='--center-all --text-purple'>MANAGER</h1> 
       <div className="--flex-between --pb">
          <h3>
            <b>Total Tasks:</b> {tasks.length}
          </h3>
          <h3>
            <b>Completed Tasks:</b> 0
          </h3>
        </div>
        { 
          tasks.map((data, index) => (
            <Task tasks={data} key={data._id} index={index} onDelete={deleteTask} onUpdate={updateTask}  />
          ))
        }


       <Form createTask={createTask} handleInputChange={handleInputChange} name={name}  />
       
    </div>
  )
}

export default TaskList