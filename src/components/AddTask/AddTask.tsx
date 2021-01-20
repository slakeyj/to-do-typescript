import React from 'react';

type Props = {
  onAdd: () => void;
};

const AddTask = (props: Props) => {
  return <input type='text' placeholder='Enter New Task' />;
};

export default AddTask;
