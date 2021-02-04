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
import { getTasks, updateTaskStatus, deleteTask } from '../../api/todos';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
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

  const getCompletedClass = (completed: boolean) =>
    completed ? 'completed' : 'incompleted';

  const calculateTotalCompleted = (tasks: Task[]): number => {
    const completed = tasks.filter(task => task.completed === true);
    return completed.length;
  };

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
              <Box
                borderBottom={1}
                borderColor='error.main'
                width={400}
                mb={4}
                key={task.id}
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
              >
                <Box display='flex' flexDirection='row'>
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
                    className={getCompletedClass(task.completed)}
                    variant='h5'
                    onClick={() => updateCompleted(task)}
                  >
                    {task.text}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    color='secondary'
                    size='large'
                    onClick={() => removeTask(task)}
                  >
                    X
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        )}
        {calculateTotalCompleted(tasks)}
      </Box>
    </>
  );
};

export default Tasks;
