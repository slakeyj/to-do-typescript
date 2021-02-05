import { Task } from '../types';

export const getAll = async () => {
  const response = await fetch(
    'https://slakey-todo-server.herokuapp.com/toDos'
  );
  const results: Task[] = await response.json();
  return results;
};

export const deleteTask = async (task: Task) => {
  await fetch(`https://slakey-todo-server.herokuapp.com/toDos/${task.id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateStatus = async (task: Task) => {
  await fetch(`https://slakey-todo-server.herokuapp.com/toDos/${task.id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
};
