import React, { useState, useEffect } from 'react';
import AddTask from '../AddTask';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import sun from '../../img/sun.png';
import moon from '../../img/moon.png';
import { Task } from '../../types';
import './Tasks.css';
import updateTaskStatus from '../../hooks/updateTaskStatus';
import deleteTask from '../../hooks/deleteTask';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://slakey-todo-server.herokuapp.com/toDos'
      );
      const results: Task[] = await response.json();
      setTasks(results);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateCompleted = (data: Task) => {
    const newCompleted = !data.completed;
    data.completed = newCompleted;
    const updatedTasksList = tasks.map((task: Task) =>
      task.id === data.id ? { ...task, completed: newCompleted } : task
    );
    updateTaskStatus(data);
    setTasks(updatedTasksList);
  };

  const removeTask = (data: Task) => {
    deleteTask(data);
    const updatedTasks = tasks.filter(task => task.id !== data.id);
    setTasks(updatedTasks);
  };

  const setCompletedClass = (completed: boolean) =>
    completed ? 'completed' : 'incompleted';

  const setAvatarImage = (completed: boolean) => (completed ? moon : sun);
  return (
    <>
      {isError && <div> Something Went Wrong</div>}
      <AddTask onAdd={fetchData} />
      <Box display='flex' flexDirection='column' alignItems='center'>
        {isloading ? (
          <CircularProgress />
        ) : (
          <Box>
            {tasks.map((task: any) => (
              <Box mb={4} key={task.id} display='flex' flexDirection='row'>
                <Avatar
                  alt={`${setAvatarImage(task.completed)}`}
                  src={setAvatarImage(task.completed)}
                  style={{
                    width: '30px',
                    height: '30px',
                    marginRight: '10px',
                  }}
                />
                <Typography
                  className={setCompletedClass(task.completed)}
                  variant='h5'
                  onClick={() => updateCompleted(task)}
                >
                  {task.text}
                </Typography>
                <Button onClick={() => removeTask(task)}>Delete</Button>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Tasks;
