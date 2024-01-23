import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../graphql/projects'

export function ProjectList() {

    const {loading, error, data} = useQuery(GET_PROJECTS);

    if(loading) return <p>LOADING</p>
    if(error) return <p>Error</p>

    console.log("----->>>",data)
  return <div>
    {
    }
  </div>
}

