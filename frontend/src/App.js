
import './App.css';
import TaskList from './component/TaskList';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const URL = process.env.REACT_APP_SERVER_URL

function App() {

  return (
    <div className="app">
      <ToastContainer /> 

      <div>

      </div>
      <div className='task-container'>
      <TaskList/>
      </div>
    </div>
  );
}

export default App;
