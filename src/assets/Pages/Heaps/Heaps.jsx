import { useEffect, useState } from "react";
import Buttons from "./Buttons";
import styled from "styled-components";
import Tree from "./Tree";
import { state } from "../../../store";
import { useSnapshot } from "valtio";

function Heaps() {
  const [heapdata, setHeapdata] = useState([[0, null]]);
  const [disabled, setDisabled] = useState(false);
  const snap = useSnapshot(state);
  useEffect(() => {
    if(window.innerWidth < 660) {
      setDisabled(true)
      document.getElementById("blured").innerHTML = "<img src='Rotate.gif' width='70%' height='70%'/>"
      setTimeout(() => {
        document.getElementById("blured").removeChild(document.getElementById("blured").childNodes[0])
        setDisabled(false)
      }, 10000);
    }
  }, [])
  return (
    <>
      <div className="flex flex-col mx-auto w-[90vw] h-[75vh] mb-4  max-md:h-[900px] mt-5 gap-5">
        <div className="flex w-[100%] max-xl:justify-center">
          <Buttons heapdata={heapdata} setHeapdata={setHeapdata} disabled={disabled}/>
        </div>
        <Blured  className="bg-black w-[100%] h-[100%] flex  flex-col  rounded-lg items-center justify-center">
          <div id="blured" className="w-[700px]  flex justify-center items-end"></div>
          <Content id = "content"  className="w-[700px] ">
            <div className=" flex justify-center gap-2 p-3">
              {heapdata.length > 1 &&
                heapdata.slice(1).map((value, index) => (
                  <Box bg={value[1]} key={index}>
                    {value[0]}
                  </Box>
                ))}
            </div>
            {state.AlgoSelected !== "Heap Sort" && (
              <Tree heapdata={heapdata} setHeapdata={setHeapdata} />
            )}
          </Content>
        </Blured>
      </div>
    </>
  );
}

export default Heaps;

const Blured = styled.div`
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(100px);
  box-shadow: 0px 0px 30px 20px rgba(255, 168, 0, 0.18);
`;

const Content = styled.div`

  @media (max-width: 660px) {
    transform: rotate(90deg);
  }
`;

const Box = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  background-color: white;
  border-radius: 10px;
  background-color: ${(props) => props.bg};

  &:hover {
    background-color: #ffa800;
    color: black;
    cursor: pointer;
  }

`;
