import React,{useState} from 'react'
import { useQuery } from 'react-query';
import styled from "styled-components";
import Comment from './Comment';
import axios from 'axios'
import { useSelector } from 'react-redux';

const Container = styled.div`
`;
const NewComment = styled.div`
display: flex;
align-items: center;
gap: 1rem;
`;
const Avatar = styled.img`
width: 5rem;
height: 5rem;
border-radius: 50%;
`;
const Input = styled.input`
border: none;
outline: none;
border-bottom: 0.1rem solid  ${({theme}) => theme.soft};
background-color: transparent;
padding: 0.5rem;
width: 100%;
color: ${({theme}) => theme.text};
`;

const fetchComments = async ({queryKey}) => {
  const response = await axios.get(`/comments/${queryKey[1]}`)
  return response.data
}

function Comments({videoId}) {
  const {user} = useSelector((state) => state.userReducer)
  const [comments, setComments] = useState([])
  useQuery(['comments', videoId], fetchComments,{
    onSuccess: (videoComments) => {
    setComments(videoComments)
    }
   })

  return (
    <Container>
       {user && <NewComment>
            <Avatar src={user?.img}/>
            <Input placeholder='Add a comment...'/>
        </NewComment>}
        {comments.map((comment) =>  <Comment key={comment._id} comment={comment}/>)}
    </Container>
  )
}

export default Comments