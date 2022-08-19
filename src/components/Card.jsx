import React from "react";
import styled from "styled-components";
import thumbnail  from '../thumbnail.PNG'
import channelImage  from '../channelImage.png'
import { Link } from "react-router-dom";

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

function Card({type}) {
  return (
    <Link to='/video/test' style={{textDecoration:'none'}}>
  <Container type={type}>
    <Image src={thumbnail} type={type}/>
    <Details type={type}>
      <ChannelImage src={channelImage} type={type}/>
      <Texts>
        <Title>Ade Video</Title>
        <ChannelName>Codenovella</ChannelName>
        <Info>721,987 views &#x2022; 1 day ago</Info>
      </Texts>
    </Details>
  </Container>
    </Link>
    );
}

export default Card;
