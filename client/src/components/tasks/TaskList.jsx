import { TaskCard } from "./TaskCard";
export function TaskList({ tasks }) {
  return (<div>
    {tasks.map(task => (
        <TaskCard/>
    ))}
    </div>
  )
}
