import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../../graphql/task";
import { useParams } from "react-router-dom";
import { GET_PROJECT } from "../../graphql/projects";

export function TaskForm() {
  const [task_Create] = useMutation(CREATE_TASK, {
    refetchQueries: [GET_PROJECT]
  });
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await task_Create({
      variables: {
        input: {
          projectId: params.id,
          title: e.target.title.value,
          // description: tasks.description,
          // statusses: tasks.statusses
        }
      }
    })
    e.target.reset()
    e.target.title.focus()
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" 
      className="bg-zinc-900 text-white w-full p-2 rounded-lg - mb-2"
      placeholder="Add a Task"/>
      <button className="bg-purple-800 text-white w-full p-2 rounded-lg" >Add</button>
    </form>
  );
}
