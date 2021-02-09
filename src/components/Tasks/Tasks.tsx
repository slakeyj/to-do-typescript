import React, { useState, useEffect } from 'react';
import AddTask from '../AddTask';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonFilters from '../ButtonFilters';
import sun from '../../img/sun.png';
import moon from '../../img/moon.png';
import { Task } from '../../types';
import './Tasks.css';
import { getAll, updateStatus, deleteTask } from '../../api/todos';

type Filter = 'All' | 'Active' | 'Completed';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [filter, setFilter] = useState<Filter>('All');

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const data = await getAll();
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
    updateStatus(data);
    setTasks(updatedTasksList);
  };

  const removeTask = (data: Task) => {
    deleteTask(data);
    const updatedTasks = tasks.filter(task => task.id !== data.id);
    setTasks(updatedTasks);
  };

  const getCompletedClass = (completed: boolean) =>
    completed ? 'completed' : 'incompleted';

  const calculateTotalLeft = (tasks: Task[]): string => {
    const completed = tasks.filter(task => task.completed === true);
    const totalCompleted = completed.length;
    const totalLeft = tasks.length - totalCompleted;
    return totalLeft > 1 || totalLeft === 0
      ? `${totalLeft} items left`
      : `${totalLeft} item left`;
  };

  const completedTasks = tasks.filter(task => task.completed === true);
  const activeTasks = tasks.filter(task => task.completed === false);

  const filterToTasks: Record<Filter, Task[]> = {
    All: tasks,
    Active: activeTasks,
    Completed: completedTasks,
  };

  const tasksToDisplay = filterToTasks[filter];

  const setAvatarImage = (completed: boolean) => (completed ? moon : sun);
  return (
    <>
      {isError && <div> Something Went Wrong</div>}
      <AddTask onAdd={fetchData} />
      <Box display='flex' flexDirection='column' alignItems='center'>
        {isloading ? (
          <CircularProgress />
        ) : (
          <>
            <ButtonFilters filter={filter} setFilter={setFilter} />
            <Box>
              {tasksToDisplay.map((task: any) => (
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
                      x
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </>
        )}

        <Box display='flex' flexDirection='row'>
          <Box
            mr={4}
            style={{
              fontSize: '18px',
            }}
          >
            {calculateTotalLeft(tasks)}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Tasks;
