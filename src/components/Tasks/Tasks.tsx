import React from 'react';
import { useQuery } from 'react-query';
import AddTask from '../AddTask';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import sun from '../../img/sun.png';
import moon from '../../img/moon.png';
// import { Task } from '../../types';

const fetchData = async () => {
  const response = await fetch(
    'https://slakey-todo-server.herokuapp.com/toDos'
  );
  return response.json();
};

const Tasks = () => {
  // const [tasks, setTasks] = useState<Task[]>([]);

  // const fetchData = async () => {
  //   const response = await fetch(
  //     'https://slakey-todo-server.herokuapp.com/toDos'
  //   );
  //   const results: Task[] = await response.json();
  //   setTasks(results);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const { isLoading, data, error, refetch } = useQuery('taskData', fetchData);

  return (
    <>
      {error && <div>Something went wrong</div>}
      <AddTask onAdd={refetch} />
      <Box display='flex' flexDirection='column' alignItems='center'>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box>
            {data.map((task: any) => (
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
        )}
      </Box>
    </>
  );
};

export default Tasks;
