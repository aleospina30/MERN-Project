import { useQuery } from '@apollo/client'
import { GET_projectModelS } from '../graphql/projectModels'

export function projectModelList() {

    const {loading, error, data} = useQuery(GET_projectModelS);

    if(loading) return <p>LOADING</p>
    if(error) return <p>Error</p>

    console.log("----->>>",data)
  return <div>
    {
    }
  </div>
}

