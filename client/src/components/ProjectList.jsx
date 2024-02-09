import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectList() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  console.log(data);
  return (
    <div>
      {data?.projects?.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
