import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT } from "../graphql/projects";

export function ProjectForm() {
  const [project, setProject] = useState({
    userId: "",
    name: "",
    description: "",
  });

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT);

  const handleChange = ({ target: { name, value } }) => {
    setProject({
      ...project,
      [name]: value,
    });
    console.log(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProject({
      variables: {
        input: {
          userId: project.userId,
          name: project.name,
          description: project.description,
        },
      },
    });
    console.log(project);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="userId"
        placeholder="User asocity"
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Write a title"
        onChange={handleChange}
      />
      <textarea
        name="description"
        rows="3"
        placeholder="Write a description"
        onChange={handleChange}
      ></textarea>
      <button disabled={!project.name || !project.description || loading}>
        Save
      </button>
    </form>
  );
}
