import {useState,useEffect} from 'react'
import styled from "styled-components";
import {useMutation} from 'react-query'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { fetchUser, fetchUserFailure, fetchUserSuccess} from '../redux-tool-kit/slices/userSlice';
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
height: calc(100vh - 5.6rem);
color: ${({theme}) => theme.text};
`;
const Wrapper = styled.div`
display: flex;
width: 30rem;
align-items: center;
flex-direction: column;
background-color: ${({theme}) => theme.bgLighter};
border: 0.1rem solid ${({theme}) => theme.soft};
padding: 2rem 5rem;
gap: 1rem;
margin-top: 2rem;
`;
const GoogleBtn = styled.div`
border: 0.2rem solid yellow;
`;
const Title = styled.h1`
font-size: 2.4rem;
`;
const SubTitle = styled.h2`
font-size: 1.6rem;
font-weight: 400;
`;
const Input = styled.input`
border: 0.1rem solid ${({theme}) => theme.soft};
border-radius: 0.3rem ;
padding: 1rem;
background-color: rgba(0,0,0,0.1);
width: 100%;
color: ${({theme}) => theme.text};
`;
const Button = styled.button`
border-radius: 0.3rem ;
border: 0.1rem solid rgba(0,0,0,0.1);
padding: 1rem 2rem;
font-weight: 500;
cursor: pointer;
background-color: ${({theme}) => theme.soft};
color: ${({theme}) => theme.textSoft};
`;
const More = styled.div`
display: flex;
margin-top: 1rem;
font-size: 1.2rem;
color: ${({theme}) => theme.textSoft};
`;
const Links = styled.div`
margin-left: 5rem;
`;
const Link = styled.span`
margin-left: 3rem;
`;

const login = async (userData) => {
 const response =  await axios.post('auth/signin', {...userData})
 return response.data
}
const googleLogin = async (userData) => {
 const response =  await axios.post('auth/google-signin', {...userData})
 return response.data
}

function Login({setIsLoggedIn}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user,loading,error} = useSelector((state) => state.userReducer )
  const {mutate} = useMutation(login, { 
    onSuccess: (response) => {
      setIsLoggedIn('true')
      localStorage.setItem('logged-in-user', JSON.stringify(response))
      dispatch(fetchUserSuccess(response))},
    onError:(error) => dispatch(fetchUserFailure(error.response.statusText))
  })
  const {mutate:googleMutate} = useMutation(googleLogin, { 
    onSuccess: (response) => {
      setIsLoggedIn('true')
      localStorage.setItem('logged-in-user', JSON.stringify(response))
      dispatch(fetchUserSuccess(response))},
    onError:(error) => dispatch(fetchUserFailure(error.response.statusText))
  })


  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback:  (response) => {
        const {name, email, picture} = jwt_decode(response.credential)
        googleMutate({name, email, img: picture})
    },
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {theme:'outline', size: 'large'})
  }, [googleMutate]);

 useEffect(() => {
  if (user) navigate('/')
 },[user,navigate])

  const handleLogin = () => {
    dispatch(fetchUser())
    mutate({username,password})
  }


  return (
    <Container>
      {loading && <SubTitle>Logging in...</SubTitle>}
      {error && <SubTitle>{error}</SubTitle>}
        <Wrapper>
        <Title>Login</Title>
        <SubTitle>to continue to AdehenryTube</SubTitle>
        <Input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
        <Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button onClick={handleLogin}>Login</Button>
        <Title>or</Title>
        <GoogleBtn id='google-btn' />
        <Title>Register</Title>
        <Input placeholder='Username'/>
        <Input type='email' placeholder='Email'/>
        <Input type='password' placeholder='Password'/>
        <Input type='password' placeholder='Confirm Password'/>
        <Button>Register</Button>
        </Wrapper>
        <More>
          English(USA)
          <Links>
           <Link>Help</Link>
           <Link>Privacy</Link>
           <Link>Terms</Link>
          </Links>
        </More>
    </Container>
  )
}

export default Login