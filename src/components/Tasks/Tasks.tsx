import React, { useState } from 'react';
import AddTask from '../AddTask';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import sun from '../../img/sun.png';
import moon from '../../img/moon.png';
import { Task } from '../../types';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, isLoading] = useState(false);

  const fetchData = async () => {
    const response = await fetch(
      'https://slakey-todo-server.herokuapp.com/toDos'
    );
    const results: Task[] = await response.json();
    setTasks(results);
  };

  return (
    <>
      <AddTask onAdd={fetchData} />
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Box>
          {tasks.map((task: any) => (
            <Box mb={4} key={task.id} display='flex' flexDirection='row'>
              <Avatar
                alt='sun'
                src={sun}
                style={{
                  width: '30px',
                  height: '30px',
                  marginRight: '10px',
                }}
              />
              <Typography variant='h5'>{task.text}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Tasks;
