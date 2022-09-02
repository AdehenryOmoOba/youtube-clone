import React,{useState} from 'react'
import styled from "styled-components";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { Button } from './Menu';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { logout} from '../redux-tool-kit/slices/userSlice';
import Upload from '../pages/Upload';


const Container = styled.div`
  position: sticky;
  top: 0rem;
  height: 5.6rem;
  background-color: ${({theme}) => theme.bgLighter};
`;
const Wrapper = styled.div`
 display: flex;
 align-items: center;
 justify-content: flex-end;
 height: 100%;
 padding: 0rem 2rem;
 position: relative;
`;

const Search = styled.div`
 position: absolute;
 width: 40%;
 left: 0rem;
 right: 0rem;
 margin: auto;
 display: flex;
 align-items: center;
 justify-content: space-between;
 padding: 0.5rem;
 border: 0.1rem solid #cccccc;
 border-radius: 0.3rem;
 color: ${({theme}) => theme.text};
`;

const Input = styled.input`
 background-color: transparent;
 border: none;
`;

const User = styled.div`
 display: flex;
 align-items: center;
 gap: 1rem;
 font-weight: 500;
 color: ${({theme}) => theme.text};
`;

const Avatar = styled.img`
width: 3.2rem;
height: 3.2rem;
border-radius: 50%;
background-color: #999999;
`;

function Navbar({setIsLoggedIn}) {
  const [openUpload, setOpenUpload] = useState(false)
  const {user} = useSelector((state) => state.userReducer )
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem('logged-in-user')
    dispatch(logout())
    setIsLoggedIn('false')
  } 

  return (
    <>
  <Container>
    <Wrapper>
      <Search>
       <Input placeholder='Search'/>
       <SearchOutlinedIcon />
      </Search>
   {user ? <User>
    <VideoCallOutlinedIcon onClick={() => setOpenUpload(true)}/>
    <Avatar src={user.img}/>
    {user.name}
    <Button onClick={handleLogout}>Logout</Button>
   </User> : 
      (<Link to='login' style={{textDecoration:'none'}}>
      <Button style={{marginTop: '0rem'}}>
        <AccountCircleOutlinedIcon />
        SIGN IN
      </Button>
      </Link>)}
    </Wrapper>
  </Container>
  {openUpload && <Upload setOpenUpload={setOpenUpload}/>}
  </>
  )
}

export default Navbar