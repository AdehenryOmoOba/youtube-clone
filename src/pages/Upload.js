import React, { useState, useEffect } from "react";
import styled from "styled-components";
import reactDOM from "react-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  position: relative;
  width: 60rem;
  height: 60rem;
  background-color: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const Close = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;
const Input = styled.input`
  border: 0.1rem solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 0.3rem;
  padding: 1rem;
  background-color: transparent;
`;
const Description = styled.textarea`
  border: 0.1rem solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 0.3rem;
  padding: 1rem;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 0.3rem;
  border: none;
  padding: 1rem 2rem;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.text};
`;

function Upload({ setOpenUpload }) {
  const [video, setVideo] = useState(null);
  const [videoImage, setVideoImage] = useState(null);
  const [videoPercentage, setVideoPercentage] = useState(0);
  const [videoImagePercentage, setVideoImagePercentage] = useState(0);
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    uploadFile(video);
  }, [video]);

  useEffect(() => {
    uploadFile(videoImage);
  }, [videoImage]);

  const uploadFile = (file) => {};

  const handleChange = (e) => {
    e.target.name === "tags"
      ? setInputs({ ...inputs, [e.target.name]: e.target.value.split(",") })
      : setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return reactDOM.createPortal(
    <Container>
      <Wrapper>
        <Close onClick={() => setOpenUpload(false)}>X</Close>
        <Title>Upload New Video</Title>
        <Label>Video:</Label>
        <Input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />
        <Input
          type="text"
          placeholder="Video Title"
          name="title"
          onChange={handleChange}
        />
        <Description
          placeholder="Description"
          name="description"
          rows={8}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Seperate tags with commas"
          name="tags"
          onChange={handleChange}
        />
        <Label>Thumbnail:</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setVideoImage(e.target.files[0])}
        />
        <Button>Upload</Button>
      </Wrapper>
    </Container>,
    document.getElementById("upload-video-portal")
  );
}

export default Upload;
