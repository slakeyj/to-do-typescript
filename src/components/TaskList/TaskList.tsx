import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import sun from '../../img/sun.png';
import moon from '../../img/moon.png';
import { Task } from '../../types';

const setAvatarImage = (completed: boolean) => (completed ? moon : sun);

const getCompletedClass = (completed: boolean) =>
  completed ? 'completed' : 'incompleted';

type Props = {
  tasksToDisplay: Task[];
  removeTask: Function;
  updateCompleted: Function;
};
const TaskList = ({ tasksToDisplay, removeTask, updateCompleted }: Props) => {
  return (
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
  );
};

export default TaskList;
