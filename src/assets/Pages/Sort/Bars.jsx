import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { state } from '../../../store';
import { useSnapshot } from 'valtio';

function Bars({ arr, setArr }) {
  const snap = useSnapshot(state);

  function generateRandomArray(n) {
    if (n <= 0) {
      return [];
    }

    const min = 10;
    const max = 150;

    const randomArray = [];
    for (let i = 0; i < n; i++) {
      const randomValue = Math.floor(Math.random() * 0.5 * (max - min)) + 10;
      randomArray.push([randomValue, '#0085FF']);
    }

    return randomArray;
  }
  useEffect(() => {
    setArr((prev) => generateRandomArray(state.ArraySize));
  }, [state.ArraySize]);

  return (
    <Box>
      {arr.map((value, index) => (
        <Sticks
          bg={value[1]}
          w={arr.length}
          h={window.innerWidth<640?value[0] * (75 / 20):value[0] * (80 / 20)}
          key={index}
        >
          {window.innerWidth<800?arr.length<20?value[0]:'':arr.length<40?value[0]:''}
        </Sticks>
      ))}
    </Box>
  );
}

export default Bars;

const Sticks = styled.div`
  background-color: ${(props) => props.bg};
  width: ${(props) => (80 / props.w) + 'vw'};
  height: ${(props) => props.h + 'px'};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(4, 22, 86, 0.7); 
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); 
  border-radius: 5px 5px 0 0 ;
  border-bottom: 2px solid rgba(4, 22, 86, 0.7) ;
  @media (max-width: 580px) {
    font-size: 10px;
  }
`;

const Box = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: flex-end;

  & :first-child {
    border-radius: 5px 5px 0 25px ;
    border-left: 2px solid rgba(4, 22, 86, 1);

  }

  & :last-child {
    border-radius: 5px 5px 25px 0;
    border-right: 2px solid rgba(4, 22, 86, 1);
  }
`;
