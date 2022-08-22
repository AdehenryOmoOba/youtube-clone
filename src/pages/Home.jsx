import styled from "styled-components";
import Card from '../components/Card';
import { useQuery } from 'react-query'
import axios from 'axios'


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem 1rem;
`;
const Messages = styled.p`
color:  ${({ theme }) => theme.text};
`;

const fetchVideos = async ({queryKey}) => {
  const response = await axios.get(`videos/${queryKey[1]}`)
  return response.data
}

function Home({type}) {
  const { data, isLoading, isError, error } = useQuery(['videos', type], fetchVideos)

  if (isLoading) return <Messages>Loading...</Messages>

  if (isError) {
    return <Messages>{error.response.data.errorMsg}</Messages>
  }

  if (data) {
    return <Container>
      {data.map((video) => <Card key={video._id} video={video}/>)}
    </Container>
  }

}
export default Home