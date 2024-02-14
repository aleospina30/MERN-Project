import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT, GET_PROJECTS } from "../graphql/projects";

export function ProjectForm() {
  // const [dataInsert, setDataInsert] = useState({})
  const [showButton, setShowButton] = useState(false)
  const [project, setProject] = useState({
    userId: "",
    name: "",
    description: "",
  });

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [
      {
        query: GET_PROJECTS,
      },
      "GetProjects",
    ],
  });
  
  const handleChange = ({ target: { name, value } }) => {
    setProject({
      ...project,
      [name]: value,
    });
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
    e.target.reset();
    e.target.name.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="w-2/5">
      <input
        type="text"
        name="userId"
        placeholder="User asocity"
        onChange={handleChange}
        className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"
      />
      <input
        type="text"
        name="name"
        placeholder="Write a title"
        onChange={handleChange}
        className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"
      />
      <textarea
        name="description"
        rows="3"
        placeholder="Write a description"
        onChange={handleChange}
        className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"
      ></textarea>
      <button disabled={!project.name || !project.description || loading}
      className={`${project.userId === '' && project.name=== '' && project.description=== ''? 'opacity-30':null} bg-purple-800 px-4 py-1 rouneded-lg text-lg mb-3 disabled:bg-purple-400`}
      >
        Save
      </button>
    </form>
  );
}
