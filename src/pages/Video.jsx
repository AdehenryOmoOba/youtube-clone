import React from 'react'
import styled from "styled-components"
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import channelImage from '../channelImage.png'
import Comments from '../components/Comments';
import Card from '../components/Card';

const Container = styled.div`
display: flex;
gap: 2.4rem;
`;
const Content = styled.div`
flex: 5;
`;
const Recommendation = styled.div`
flex: 2;
`;
const VideoWrapper = styled.div`

`;
const Title = styled.h1`
font-size: 1.8rem;
font-weight: 400;
margin-top: 2rem;
margin-bottom: 1rem;
color: ${({theme}) => theme.text};
`;
const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;
const Info = styled.span`
color: ${({theme}) => theme.textSoft};

`;
const Buttons = styled.div`
display: flex;
gap: 2rem;
color: ${({theme}) => theme.text};
`;
const Hr = styled.hr`
margin: 1.5rem 0rem;
border: 0.05rem solid ${({theme}) => theme.soft};
`;
const Button = styled.div`
display: flex;
align-items: center;
column-gap: 0.5rem;
cursor: pointer;
`;
const Channel = styled.div`
display: flex;
justify-content: space-between;
`;
const ChannelInfo = styled.div`
display: flex;
gap: 2rem;
`;

const Image = styled.img`
width: 5rem;
height: 5rem;
border-radius: 50%;
`;
const ChannelDetails = styled.div`
display: flex;
flex-direction: column;
color: ${({theme}) => theme.text};

`;
const ChannelName = styled.div`
 font-weight: 500;
`;
const ChannelCounter = styled.div`
margin-top: 0.5rem;
margin-bottom: 2rem;
color: ${({theme}) => theme.textSoft};
font-size: 1.2rem;

`;
const Description = styled.div`
font-size: 1.4rem;
`;

const SubscribeBtn = styled.button`
background-color: #cc1a00;
font-weight: 500;
color: #ffffff;
border: none;
border-radius: 0.3rem;
height: max-content;
padding: 1rem 2rem;
cursor: pointer;
`;

function Video() {
  return (
    <Container>
      <Content>
        <VideoWrapper>
        <iframe width="100%" 
               height="620" 
               src="https://www.youtube.com/embed/gxBkghlglTg" 
               title="YouTube video player" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen></iframe>
        </VideoWrapper>
        <Title>Test video</Title>
        <Details>
          <Info>23,804 views &#x2022; August 16, 2022</Info>
          <Buttons>
            <Button><ThumbUpOutlinedIcon />28.9k</Button>
            <Button><ThumbDownOffAltOutlinedIcon />DISLIKE</Button>
            <Button><ReplyOutlinedIcon />REPLY</Button>
            <Button><AddTaskOutlinedIcon />SAVE</Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channelImage}/>
            <ChannelDetails>
              <ChannelName>Codenovella</ChannelName>
              <ChannelCounter>357k Subscibers</ChannelCounter>
              <Description>This video focuses on how to use Astro - A new product designed to enhance your productivity wether you're working remotely or at the office. It also some with a 3 years warranty!. You also get to enjoy a wooping 50% discount if you purchase between now and August 23rd, 2022. Hurry now while stock last!</Description>
            </ChannelDetails>
          </ChannelInfo>
          <SubscribeBtn>SUBSCRIBE</SubscribeBtn>
        </Channel>
        <Hr />
        <Comments />
      </Content>
      <Recommendation>
        <Card type='small'/>
        <Card type='small'/>
        <Card type='small'/>
        <Card type='small'/>
        <Card type='small'/>
        <Card type='small'/>
      </Recommendation>
    </Container>
  )
}

export default Video