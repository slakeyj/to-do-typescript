import { Task } from '../types';

const deleteTask = async (task: Task) => {
  await fetch(`https://slakey-todo-server.herokuapp.com/toDos/${task.id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default deleteTask;
