import { Task } from '../types';

const updateTaskStatus = async (task: Task) => {
  await fetch(`https://slakey-todo-server.herokuapp.com/toDos/${task.id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
};

export default updateTaskStatus;
