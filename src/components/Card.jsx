import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {format} from 'timeago.js'
import { useQuery } from 'react-query'
import axios from 'axios'



const Container = styled.div`
width:${({type}) => type !== 'small' && '36rem'}; 
cursor: pointer;
margin-bottom: ${({type}) => type === 'small' ? '1rem' : '4.5rem'};
display: ${({type}) => type === 'small' && 'flex'};
gap: 1rem;
;`
const Image = styled.img`
  width: 100%;
  height:  ${({type}) => type === 'small' ? '12rem' : '20.2rem'};
  background-color: #999999;
  flex: 1;
`;
const ChannelImage = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  background-color: #999999;
  display: ${({type}) => type === 'small' && 'none'};
`;
const Details = styled.div`
  display: flex;
  margin-top: ${({type}) => type !== 'small' && '1.6rem'};
  gap: 1.2rem;
  flex: 1;
 `;
const Texts = styled.div``;

const Title = styled.h1`
font-size: 1.6rem;
font-weight: 500;
color: ${({theme}) => theme.text};
 `;

const ChannelName = styled.h2`
font-size: 1.4rem;
color: ${({theme}) => theme.textSoft};
margin: 0.9rem 0rem;
 `;

const Info = styled.div`
  font-size: 1.4rem;
  color: ${({theme}) => theme.textSoft};
 `;
 const Messages = styled.p`
 color:  ${({ theme }) => theme.text};
 `;

const fetchChannelUser = async ({queryKey}) => {
  const response = await axios.get(`users/find/${queryKey[1]}`)
  return response.data
}

function Card({type,video}) {
  const { data, isLoading, isError, error } = useQuery(['channelUser', video.userId], fetchChannelUser)


  if (isLoading) return <Messages>Loading...</Messages>

  if (isError) {
    return <Messages>{error.response.data.errorMsg}</Messages>
  }
  
  if(data){
      return (
        <Link to='/video/test' style={{textDecoration:'none'}}>
      <Container type={type}>
        <Image src={video.imgURL} type={type}/>
        <Details type={type}>
          <ChannelImage src={data.img} type={type}/>
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{data.name}</ChannelName>
            <Info>{video.views} views &#x2022; {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
        </Link>
        );
  }
}

export default Card;
