import React from 'react'
import styled from "styled-components";


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

function Login() {
  return (
    <Container>
        <Wrapper>
        <Title>Login</Title>
        <SubTitle>to continue to AdehenryTube</SubTitle>
        <Input placeholder='Username'/>
        <Input type='password' placeholder='Password'/>
        <Button>Login</Button>
        <Title>or</Title>
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