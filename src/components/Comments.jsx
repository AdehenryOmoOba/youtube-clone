import React from 'react'
import styled from "styled-components";
import channelImage from '../channelImage.png'
import Comment from './Comment';

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

function Comments() {
  return (
    <Container>
        <NewComment>
            <Avatar src={channelImage}/>
            <Input placeholder='Add a comment...'/>
        </NewComment>
        <Comment />
    </Container>
  )
}

export default Comments