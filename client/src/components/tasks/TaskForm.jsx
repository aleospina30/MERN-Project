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
      <input type="text" name="title" />
      <button>Add</button>
    </form>
  );
}
