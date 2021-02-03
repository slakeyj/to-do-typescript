import React, { useState } from 'react';
import { Task } from '../../types';

type Props = {
  tasks: {};
};

const StatusBar = ({ tasks }: Props) => {
  const [completedTasks, setCompletedTasks] = useState(0);

  const calculateCompleted = (tasks: any) => {
    const completed = tasks.filter((task: Task) => task.completed === true);
    setCompletedTasks(completed.length);
  };
  calculateCompleted(tasks);
  return <p>{completedTasks}</p>;
};

export default StatusBar;
