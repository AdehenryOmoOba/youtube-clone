import React,{useState} from 'react'
import styled from "styled-components"
import { useQuery} from 'react-query';
import Card from '../components/Card';
import axios from 'axios';

const Container = styled.div`
flex: 2;
`;

const fetchVideos = async ({queryKey}) => {
    const queryString = queryKey[1]?.join(',')
  const response = await axios.get(`/videos/search-by-tags?tags=${queryString}`)
  return response.data
}

function Recommendations({tags}) {
    const [videos, setVideos] = useState([])

    useQuery(['videos', tags], fetchVideos,{
        onSuccess: (videosObj) => {
            setVideos(videosObj)
       },
       onError: (error) => {
        console.log(error.message)
       }
     })

  return (
    <Container>
        {videos?.map((video) => {
          return  <Card key={video._id} video={video} type='sm'/>
        })}
    </Container>
  )
}

export default Recommendations