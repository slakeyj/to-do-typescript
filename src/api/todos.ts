import { Task } from '../types';

const getTasks = async () => {
  const response = await fetch(
    'https://slakey-todo-server.herokuapp.com/toDos'
  );
  const results: Task[] = await response.json();
  return results;
};

const deleteTask = async (task: Task) => {
  await fetch(`https://slakey-todo-server.herokuapp.com/toDos/${task.id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

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

export { getTasks, updateTaskStatus, deleteTask };
