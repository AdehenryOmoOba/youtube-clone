import React, { useState, useEffect } from "react";
import styled from "styled-components";
import reactDOM from "react-dom";
import { app } from "../firebase";
import {useMutation} from 'react-query'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const addVideo = async (videoData) => {
  const response =  await axios.post('/videos', videoData)
  return response.data
 }


function Upload({ setOpenUpload }) {
  const navigate = useNavigate()
  const [video, setVideo] = useState(null);
  const [videoImage, setVideoImage] = useState(null);
  const [videoPercentage, setVideoPercentage] = useState(0);
  const [videoImagePercentage, setVideoImagePercentage] = useState(0);
  const [inputs, setInputs] = useState({});

  const {mutate} = useMutation(addVideo, { 
    onSuccess: (response) => {
    setOpenUpload(false)
    navigate(`/video/${response._id}`)
    },
    onError:(error) => console.log(error.message)
  })

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    videoImage && uploadFile(videoImage, "imgUrl");
  }, [videoImage]);

  const handleChange = (e) => {
    e.target.name === "tags"
      ? setInputs((prevInputs) => {
          return { ...prevInputs, [e.target.name]: e.target.value.toLowerCase().split(",") };
        })
      : setInputs((prevInputs) => {
          return { ...inputs, [e.target.name]: e.target.value };
        });
  };

  const uploadFile = (file, urlType) => {
    const firebaseStorage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const firebaseStorageRef =
      urlType === "imgUrl"
        ? ref(firebaseStorage, `youtubeclone/images/${fileName}`)
        : ref(firebaseStorage, `youtubeclone/videos/${fileName}`);
    const uploadTask = uploadBytesResumable(firebaseStorageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setVideoImagePercentage(Math.round(progress))
          : setVideoPercentage(Math.round(progress));
        switch (snapshot.state) {
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log(snapshot.state);
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prevInputs) => {
            return { ...prevInputs, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  const handleUpload = () => {
    mutate(inputs)
  };

  return reactDOM.createPortal(
    <Container>
      <Wrapper>
        <Close onClick={() => setOpenUpload(false)}>X</Close>
        <Title>Upload New Video</Title>
        <Label>Video:</Label>
        {videoPercentage > 0 ? (
          "Uploading: " + videoPercentage + "%"
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Video Title"
          name="title"
          onChange={handleChange}
        />
        <Description
          placeholder="Description"
          name="desc"
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
        {videoImagePercentage > 0 ? (
          "Uploading: " + videoImagePercentage + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setVideoImage(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>,
    document.getElementById("upload-video-portal")
  );
}

export default Upload;
