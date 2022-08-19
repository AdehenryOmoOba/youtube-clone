import React from 'react'
import styled from "styled-components";
import channelImage from '../channelImage.png'


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


function Comment() {
  return (
    <Container>
        <Avatar src={channelImage}/>
        <Details>
          <Name>Henry Ade <Date>1 day ago</Date></Name>
          <Text>I appreciate your effort towards the growth of the community. You are doing a great job on the JS courses and i would like you to also do something on REACT and Tailwind CSS also. Remain blessed!</Text>
        </Details>

    </Container>
  )
}

export default Comment