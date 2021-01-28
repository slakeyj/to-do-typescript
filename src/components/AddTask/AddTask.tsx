import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { Task } from '../../types';
import spaceman from '../../img/spaceman.png';
import { useMutation } from 'react-query';

type Props = {
  onAdd: () => void;
};

type TaskToCreate = Omit<Task, 'id'>;

const postIt = async (task: TaskToCreate) => {
  const url = 'https://slakey-todo-server.herokuapp.com/toDos';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  };
  await fetch(url, options);
};

const AddTask = ({ onAdd }: Props) => {
  const [value, setValue] = useState('');

  // useMutation((task: TaskToCreate) => postIt(task))
  const { mutateAsync } = useMutation(postIt);

  const addTask = async (text: string) => {
    await mutateAsync({ text, completed: false });
    onAdd();
  };

  const onKeyPress = (event: any) => {
    if (event.charCode === 13) {
      addTask(event.target.value);
      setValue('');
    }
  };

  return (
    <Box m={8} display='flex' justifyContent='center'>
      <Avatar
        alt='spaceman'
        src={spaceman}
        style={{
          width: '70px',
          height: '70px',
        }}
      />
      <TextField
        id='outlined-basic'
        label='Add New Task'
        value={value}
        onChange={event => setValue(event.target.value)}
        onKeyPress={onKeyPress}
      />
    </Box>
  );
};

export default AddTask;
