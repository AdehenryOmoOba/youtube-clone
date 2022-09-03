import React,{useState} from 'react'
import styled from "styled-components"
import { useQuery} from 'react-query';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 5rem;
`;

const fetchVideos = async ({queryKey}) => {
  const response = await axios.get(`/videos/search-by-title${queryKey[1]}`)
  return response.data
}

function Search() {
    const [videos, setVideos] = useState([])
    const queryString = useLocation().search

    useQuery(['search-videos', queryString], fetchVideos,{
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
          return  <Card key={video._id} video={video} />
        })}
    </Container>
  )
}

export default Search