import React, { useState } from "react";
import { state } from "../../../store";
import { useSnapshot } from "valtio";
import "react-dropdown/style.css";
import { BsGooglePlay } from "react-icons/bs";
import { TbBinaryTree } from "react-icons/tb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Buttons() {
  const snap = useSnapshot(state);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const handleClick = async (algo) => {
    state.AlgoSelected = algo
  };

  return (
    <>
      <div className="flex justify-between w-[100%] gap-3 max-xl:flex-col max-[880px]:w-[100%]">
        <div className="flex gap-3 flex-grow max-xl:w-[100%] max-sm:flex-col">
          <div onClick={() => handleClick("Regression")} className="mx-1 flex-grow bg-[#FFA800] justify-center cursor-pointer text-lg font-medium flex hover:bg-yellow-300 rounded-lg px-5 h-[40px] text-center items-center">
            Regression
          </div>
          <div onClick={() => handleClick("Random Forest")} className="mx-1 flex-grow bg-[#FFA800] justify-center cursor-pointer text-lg font-medium flex hover:bg-yellow-300 rounded-lg px-5 h-[40px] text-center items-center">
            Random Forest
          </div>
          <div onClick={() => handleClick("Decision Tree")} className="mx-1 flex-grow bg-[#FFA800] justify-center cursor-pointer text-lg font-medium flex hover:bg-yellow-300 rounded-lg px-5 h-[40px] text-center items-center">
            Decision Tree
          </div>
          <div onClick={() => handleClick("Logistics Regression")} className="mx-1 flex-grow bg-[#FFA800] justify-center cursor-pointer text-lg font-medium flex hover:bg-yellow-300 rounded-lg px-5 h-[40px] text-center items-center">
            Logistics Regression
          </div>
        </div>
      </div>
    </>
  );
}

export default Buttons;
