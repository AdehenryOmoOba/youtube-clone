import React,{useState} from 'react'
import styled from "styled-components"
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import channelImage from '../channelImage.png'
import Comments from '../components/Comments';
import Card from '../components/Card';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { fetchVideoFailure, fetchVideoSuccess } from '../redux-tool-kit/slices/videoSlice';
import { format } from 'timeago.js';




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
border: 1rem solid yellow;
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

const fetchVideo = async ({queryKey}) => {
  const response = await axios.get(`/videos/find/${queryKey[1]}`)
  return response.data
}

const fetchChannel = async ({queryKey}) => {
  const response = await axios.get(`/users/find/${queryKey[1]}`)
  return response.data
}

function Video() {
  const dispatch = useDispatch()
  const [channel, setChannel] = useState({})
  const {user} = useSelector((state) => state.userReducer)
  const {video} = useSelector((state) => state.videoReducer)
  const {pathname} = useLocation()
  const videoId = pathname.split('/')[2]
  const {data, isLoading,isError,error} = useQuery(['video', videoId], fetchVideo,{
    onSuccess: (videoObj) => {
     dispatch(fetchVideoSuccess(videoObj))
    },
    onError: (error) => {
      console.log(error)
      dispatch(fetchVideoFailure(error))
    }
  })

  const {data:channelData} = useQuery(['channel', video?.userId], fetchChannel,{
   enabled: video ? true : false,
   onSuccess: (channelObj) => {
    setChannel(channelObj)
   }
  })

  console.log(video)
  console.log(channel)

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
        <Title>{video?.title}</Title>
        <Details>
          <Info>{video?.views} views &#x2022; {format(video?.createdAt)}</Info>
          <Buttons>
            <Button>{video?.likes?.length}<ThumbUpOutlinedIcon /></Button>
            <Button><ThumbDownOffAltOutlinedIcon />DISLIKE</Button>
            <Button><ReplyOutlinedIcon />REPLY</Button>
            <Button><AddTaskOutlinedIcon />SAVE</Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img}/>
            <ChannelDetails>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>{channel?.subscribers} Subscibers</ChannelCounter>
              <Description>{video?.desc}</Description>
            </ChannelDetails>
          </ChannelInfo>
          <SubscribeBtn>SUBSCRIBE</SubscribeBtn>
        </Channel>
        <Hr />
        <Comments />
      </Content>
      <Recommendation>
        {/* <Card type='small'/>
        <Card type='small'/>
        <Card type='small'/>
        <Card type='small'/>
        <Card type='small'/>
        <Card type='small'/> */}
      </Recommendation>
    </Container>
  )
}

export default Video