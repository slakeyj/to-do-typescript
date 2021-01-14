import React, { useState, useEffect } from 'react';
type Result = {
  id: number;
  task: string;
  difficulty: string;
  status: boolean;
};

const Task = () => {
  const [tasks, setTasks] = useState<Result[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://slakey-todo-server.herokuapp.com/toDos'
      );
      const results: Result[] = await response.json(); // grabs body and calls JSON parse
      setTasks(results);
    };
    fetchData();
  }, []);

  console.log('tasks', tasks);

  return <p>Tasks Go Here</p>;
};

export default Task;
