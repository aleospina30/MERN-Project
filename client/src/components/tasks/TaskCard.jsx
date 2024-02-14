import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../../graphql/task";
import { GET_PROJECT } from "../../graphql/projects";
import { AiOutlineDelete } from "react-icons/ai";

export function TaskCard({ task }) {
  const [task_Delete] = useMutation(DELETE_TASK, {
    refetchQueries: [
      {
        query: GET_PROJECT,
      },
    ],
  });

  return (
    <div className="bg-zinc-900 px-5 py-3 mb-2 flex justify-between">
      <h1 className="text-sm">{task.title}</h1>
      <button
        onClick={() => {
          task_Delete({
            variables: {
              id: task._id,
            },
          });
        }}
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
}
