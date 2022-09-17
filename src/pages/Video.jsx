import React,{useState} from 'react'
import styled from "styled-components"
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Comments from '../components/Comments';
import Recommendations from '../components/Recommendations';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useQuery ,useMutation} from 'react-query';
import axios from 'axios';
import { fetchVideoFailure, fetchVideoSuccess, likeVideoSuccess,dislikeVideoSuccess } from '../redux-tool-kit/slices/videoSlice';
import { subscription as userSubscription } from '../redux-tool-kit/slices/userSlice';
import { format } from 'timeago.js';



const Container = styled.div`
display: flex;
gap: 2.4rem;
`;
const Content = styled.div`
flex: 5;
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
const VideoFrame = styled.video`
  max-height: 72rem;
  width: 100%;
  object-fit: cover;
`
const fetchVideo = async ({queryKey}) => {
  const response = await axios.get(`/videos/find/${queryKey[1]}`)
  return response.data
}

const fetchChannel = async ({queryKey}) => {
  const response = await axios.get(`/users/find/${queryKey[1]}`)
  return response.data
}

const likeVideo = async (data) => {
  const {userInfo} = data[0]
  const response = await axios.put(`/users/like/${data[1]}`, userInfo)
  return response.data
}
const dislikeVideo = async (data) => {
  const {userInfo} = data[0]
  const response = await axios.put(`/users/dislike/${data[1]}`, userInfo)
  return response.data
}
const subscription = async (data) => {
  const {channel} = data[0]
  if(data[2] === 'SUBSCRIBE') {
    const response = await axios.put(`/users/sub/${data[1]}`, {channel})
    return response.data
  }
  if(data[2] === 'SUBSCRIBED') {
    const response = await axios.put(`/users/unsub/${data[1]}`, {channel})
    return response.data
  }
}


function Video() {
  const dispatch = useDispatch()
  const [channel, setChannel] = useState({})
  const {user} = useSelector((state) => state.userReducer)
  const {video} = useSelector((state) => state.videoReducer)
  const {pathname} = useLocation()
  const videoId = pathname.split('/')[2]

  const {mutate} = useMutation(likeVideo,{
    onSuccess: (response) => dispatch(likeVideoSuccess(response))
  })

  const {mutate:dislikeMutate} = useMutation(dislikeVideo,{
    onSuccess: (response) => dispatch(dislikeVideoSuccess(response))
  })
  
  const {mutate:subscriptionMutate} = useMutation(subscription,{
    onSuccess: ({newUser,subscribedUsers,count}) => {
      setChannel({...channel,subscribers: Number(channel.subscribers) + Number(count)})
      dispatch(userSubscription(subscribedUsers))
      localStorage.setItem("logged-in-user",JSON.stringify(newUser))
    }
  })

     useQuery(['video', videoId], fetchVideo,{
     onSuccess: (videoObj) => {
     dispatch(fetchVideoSuccess(videoObj))
    },
    onError: (error) => {
      dispatch(fetchVideoFailure(error))
    }
  })

   useQuery(['channel', video?.userId], fetchChannel,{
   enabled: video ? true : false,
   onSuccess: (channelObj) => {
   setChannel(channelObj)
   }
  })

  const handleLike = () => {
    if(!user) return
   mutate([{userInfo:{id: user?._id}},videoId])

  }

  const handleDislike = () => {
    if(!user) return
    dislikeMutate([{userInfo:{id: user?._id}},videoId])
  }

  const handleSubscription = (e) => {
    if(!user) return
    let subStatus = e.target.textContent
    subscriptionMutate([{channel:{id: channel?._id}},user?._id,subStatus])
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
         <VideoFrame src={video?.videoUrl} controls poster={video?.imgUrl}/>
        </VideoWrapper>
        <Title>{video?.title}</Title>
        <Details>
          <Info>{video?.views} views &#x2022; {format(video?.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>{video?.likes.includes(user?._id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />} {video?.likes?.length}</Button>
            <Button onClick={handleDislike}>{video?.dislikes.includes(user?._id) ? <ThumbDownIcon /> : <ThumbDownOffAltOutlinedIcon />} DISLIKE</Button>
            <Button><ReplyOutlinedIcon />SHARE</Button>
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
          <SubscribeBtn onClick={handleSubscription}>{user?.subscribedUsers?.includes(channel?._id) ? "SUBSCRIBED" : "SUBSCRIBE"}</SubscribeBtn>
        </Channel>
        <Hr />
        {user && <Comments videoId={video?._id}/>}
      </Content>
      <Recommendations tags={video?.tags} channel={channel}/>
    </Container>
  )
}

export default Video