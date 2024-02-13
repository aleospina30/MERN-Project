import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../../graphql/task";
import { GET_PROJECT } from "../../graphql/projects";

export function TaskCard({ task }) {
  const [task_Delete] = useMutation(DELETE_TASK, {
    refetchQueries: [
      {
        query: GET_PROJECT,
      },
    ],
  });

  return (
    <div>
      <h1>{task.title}</h1>
      <button
        onClick={() => {
          task_Delete({
            variables: {
              id: task._id,
            },
          });
        }}
      >
        Delete
      </button>
    </div>
  );
}
