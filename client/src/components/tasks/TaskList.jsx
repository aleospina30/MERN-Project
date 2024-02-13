import { TaskCard } from "./TaskCard";
export function TaskList({ tasks }) {
  
  const tasksFilter = tasks.filter((task) => !task.isRemove);

  return (
    <div>
      {tasksFilter.map((task) => (
        <TaskCard task={task} tasks={tasks} key={task._id} />
      ))}
    </div>
  );
}
