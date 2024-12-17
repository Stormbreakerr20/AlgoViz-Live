import React, { useState } from "react";

function Buttons({setAbout}) {
  const handleClick = async (section) => {
    setAbout(section)
  };
  return (
    <>
      <div className="flex justify-between w-[100%] gap-3 max-xl:flex-col max-[880px]:w-[100%]">
        <div className="flex gap-3 flex-grow max-xl:w-[100%] max-sm:flex-col">
          <div onClick={() => handleClick("Me")} className="mx-1 flex-grow bg-[#FFA800] justify-center cursor-pointer text-lg font-medium flex hover:bg-yellow-300 rounded-lg px-5 h-[40px] text-center items-center">
            Learn about Luv Sharma
          </div>
        </div>
      </div>
    </>
  );
}

export default Buttons;
