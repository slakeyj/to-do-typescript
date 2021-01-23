import React, { useState, useEffect } from 'react';
import AddTask from '../AddTask';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Task } from '../../types';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchData = async () => {
    const response = await fetch(
      'https://slakey-todo-server.herokuapp.com/toDos'
    );
    const results: Task[] = await response.json();
    setTasks(results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AddTask onAdd={fetchData} />
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Typography variant='h4' component='h1'>
          Tasks
        </Typography>
        <ul>
          {tasks.map(task => {
            return (
              <>
                <li key={task.text}>{task.text}</li>
              </>
            );
          })}
        </ul>
      </Box>
    </>
  );
};

export default Tasks;
