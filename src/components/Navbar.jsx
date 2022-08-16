import React from 'react'
import styled from "styled-components";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { Button } from './Menu';

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
`;

const Input = styled.input`
 background-color: transparent;
 border: none;
`;

function Navbar() {
  return (
  <Container>
    <Wrapper>
      <Search>
       <Input placeholder='Search'/>
       <SearchOutlinedIcon />
      </Search>
      <Button style={{marginTop: '0rem'}}>
        <AccountCircleOutlinedIcon />
        SIGN IN
      </Button>
    </Wrapper>
  </Container>
  )
}

export default Navbar