import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import styled from "styled-components";
import { format } from 'timeago.js';

const Container = styled.div`
display: flex;
gap: 1rem;
margin: 3rem 0rem;
`;

const Avatar = styled.img`
width: 5rem;
height: 5rem;
border-radius: 50%;
`;

const Details = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
color: ${({theme}) => theme.text};

`;

const Name = styled.span`
font-size: 1.3rem;
font-weight: 500;
`;
const Date = styled.span`
font-size: 1.3rem;
font-weight: 500;
color: ${({theme}) => theme.textSoft};
margin-left: 0.5rem;
`;
const Text = styled.span`
font-size: 1.4rem;
`;

const fetchCommentUser = async ({queryKey}) => {
  const response = await axios.get(`/users/find/${queryKey[1]}`)
  return response.data
}

function Comment({comment}) {
    const [commentUser, setCommentUser] = useState({})
  
     useQuery(['commentator', comment.userId], fetchCommentUser,{
     onSuccess: (commentator) => {
      setCommentUser(commentator)
     }
    })

  return (
    <Container>
        <Avatar src={commentUser.img}/>
        <Details>
          <Name>{commentUser.name}<Date>{format(comment.postedAt)}</Date></Name>
          <Text>{comment.desc}</Text>
        </Details>

    </Container>
  )
}

export default Comment