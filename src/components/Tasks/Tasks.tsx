import React, { useState, useEffect } from 'react';
import AddTask from '../AddTask';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import ButtonFilters from '../ButtonFilters';
import { Task } from '../../types';
import './Tasks.css';
import { getAll, updateStatus, deleteTask } from '../../api/todos';
import TaskList from '../TaskList';

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
            <TaskList
              tasksToDisplay={tasksToDisplay}
              removeTask={removeTask}
              updateCompleted={updateCompleted}
            />
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
