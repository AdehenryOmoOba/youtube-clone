import React from 'react'
import styled from "styled-components";
import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import HistoryIcon from '@mui/icons-material/History';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import logo from '../logo.png'
import { Link } from 'react-router-dom';

const Container = styled.div`
  flex: 1;
  background-color: ${({theme}) => theme.bgLight};
  height: 100vh;
  color: ${({theme}) => theme.text};
  font-size: 1.4rem;
  position: sticky;
  top: 0rem;
`;
const Wrapper = styled.div`
 padding: 1.8rem 2.6rem;
`;
const Hr = styled.hr`
 margin: 1.5rem 0rem;
 border: 0.05rem solid ${({theme}) => theme.soft};
`;
const Img = styled.img`
 height: 2.5rem;
`;
const Logo = styled.div`
 display: flex;
 align-items: center;
 gap: 0.5rem;
 font-weight: bold;
 margin-bottom: 2.5rem;
`;
const Item = styled.div`
 display: flex;
 align-items: center;
 gap: 2rem;
 cursor: pointer;
 padding: 0.75rem 0rem;
 &:hover{
  background-color:  ${({theme}) => theme.soft};
 }
`;
const Login = styled.div`

`;
export const Button = styled.button`
padding: 0.5rem 1.5rem;
background-color: transparent;
border: 0.1rem solid #3ea6ff;
color: #3ea6ff;
border-radius: 0.3rem;
font-weight: 500;
margin-top: 1rem;
cursor: pointer;
display: flex;
align-items: center;
gap: 0.5rem;
`;

const Title = styled.h2`
font-size: 1.4rem;
font-weight: 500;
color: #aaaaaa;
margin-bottom: 2rem;
`;

function Menu({setDarkMode,darkMode}) {
  return (
    <Container>
     <Wrapper>
      <Link to='/' style={{textDecoration:'none', color:'inherit'}}>
      <Logo>
      <Img src={logo}/>
      AdehenryTube
      </Logo>
      </Link>
      <Link to='/' style={{textDecoration:'none', color:'inherit'}}>
      <Item>
        <HomeIcon />
        Home
      </Item>
      </Link>
      <Link to='trend' style={{textDecoration:'none', color:'inherit'}}>
      <Item>
        <ExploreOutlinedIcon />
        Explore
      </Item>
      </Link>
      <Link to='subscribed' style={{textDecoration:'none', color:'inherit'}}>
      <Item>
        <SubscriptionsOutlinedIcon />
        Subscriptions
      </Item>
      </Link>
      <Hr />
      <Item>
        <VideoLibraryOutlinedIcon />
        Library
      </Item>
      <Item>
        <HistoryIcon />
        History
      </Item>
      <Hr />
      <Login>
      Sign in to like videos, comment, and subscribe.
      <Link to='login' style={{textDecoration:'none'}}>
      <Button><AccountCircleOutlinedIcon /> SIGN IN</Button>
      </Link>
      </Login>
      <Hr />
      <Title>BEST OF ADEHENRYTUBE</Title>
      <Item>
        <LibraryMusicOutlinedIcon />
        Music
      </Item>
      <Item>
        <SportsBasketballIcon />
        Sports
      </Item>
      <Item>
        <SportsEsportsOutlinedIcon />
        Gaming
      </Item>
      <Item>
        <MovieCreationOutlinedIcon />
        Movies
      </Item>
      <Item>
        <NewspaperIcon />
        News
      </Item>
      <Item>
        <LiveTvIcon />
        Live
      </Item>
      <Hr />
      <Item>
        <SettingsOutlinedIcon />
        Settings
      </Item>
      <Item>
        <OutlinedFlagIcon />
        Report
      </Item>
      <Item>
        <HelpOutlineOutlinedIcon />
        Help
      </Item>
      <Item onClick={() => setDarkMode((prev) => prev === 'light' ? 'dark' : "light")}>
        <SettingsBrightnessIcon />
        {darkMode === "light" ? 'Dark Mode':'Light Mode'}
      </Item>
     </Wrapper>
    </Container>
  )
}

export default Menu