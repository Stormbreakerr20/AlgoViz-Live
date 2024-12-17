import React, { useEffect ,useState} from 'react'
import Buttons from "./Buttons";
import styled from "styled-components";
import Project from './Project';
import Me from './Me';

function About() {
  const [about, setAbout] = useState("Me")
  return (
    <>
      <div className="flex flex-col mx-auto w-[90vw] h-[75vh] max-sm:h-[max-content] mt-5 gap-5 ">
        <div className="flex w-[100%]  flex-col gap-3">
          <Buttons setAbout={setAbout}/>
        </div>
        <Blured className="w-[100%] h-[100%] flex  flex-col gap-5 mb-[3rem]   rounded-lg items-center justify-center">
          <div className=" w-[100%]  gap-3 p-3">
           {about === "Me"? <Me/>: <></>}
          </div>
        </Blured>
      </div>
    </>
  )
}

export default About

const Blured = styled.div`
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(100px);
  box-shadow: 0px 0px 30px 20px rgba(255, 168, 0, 0.18);
  margin-bottom: 1rem;
`;

const Box = styled.div`
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: larger;
    font-weight: 500;
    background-color: white;
    border-radius:10px;
    background-color: ${props => props.bg};

    &:hover{
        background-color: #FFA800;
        color:black;
        cursor: pointer;
    }

    @media (max-width:675px) {
        width: 10vw;
        height: 10vw;
    }

`