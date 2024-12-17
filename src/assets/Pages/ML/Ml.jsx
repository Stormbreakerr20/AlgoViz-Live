import React, { useEffect ,useState} from 'react'
import api from '../../../api'
import Buttons from "./Buttons";
import styled from "styled-components";
import { state } from "../../../store";
import { useSnapshot } from "valtio";
import Regression from './Regression/Regression'
import Rf from './RandomForest/Rf';
import Dt from './Decision_Tree/Decision_tree';
import Log_Reg from './Logistics_Reg/Log_Reg';

function Ml() {
  const snap = useSnapshot(state)
  return (
    <>
      <div className="flex flex-col mx-auto w-[90vw] h-[75vh] mt-5 max-sm:mb-[10rem] gap-5 ">
        <div className="flex w-[100%]  flex-col gap-3">
          <Buttons />
        </div>
        <Blured className="w-[100%] h-[100%] flex  flex-col gap-5 mb-[3rem]   rounded-lg items-center justify-center">
          <div className=" w-[100%]  gap-3 p-3">
           {state.AlgoSelected === "Regression"? <Regression/> : <></>}
           {state.AlgoSelected === "Random Forest"? <Rf/> : <></>}
           {state.AlgoSelected === "Decision Tree"? <Dt/> : <></>}
           {state.AlgoSelected === "Logistics Regression"? <Log_Reg/> : <></>}
          </div>
        </Blured>
      </div>
    </>
  )
}

export default Ml

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