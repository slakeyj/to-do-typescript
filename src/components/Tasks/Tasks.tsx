import React, { useState, useEffect } from 'react';
import AddTask from '../AddTask';

type Task = {
  id: number;
  text: string;
  difficulty: string;
  status: boolean;
};

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
      <ul>
        {tasks.map(task => {
          return (
            <>
              <li key={task.text}>{task.text}</li>
              <button>Update Status</button>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default Tasks;
