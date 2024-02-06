import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/projects";

export function ProjectList() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  console.log(data);

  return <div>ProjectList</div>;
}
