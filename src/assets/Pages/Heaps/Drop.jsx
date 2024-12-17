import React, { useState } from "react";
import { state } from "../../../store";
import { useSnapshot } from "valtio";

function Drop({setheapdata,setprevSelected}) {
  const snap = useSnapshot(state);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [Selected, setSelected] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (algoSelected) => {
    setprevSelected(state.AlgoSelected)
    state.AlgoSelected = algoSelected;
    setSelected(true)
    setIsDropdownOpen(false);
    if(state.AlgoSelected !== "Heap Sort") setheapdata(prev => [[0,null]])
  };

  return (
    <>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={`text-gray-900 justify-center w-[100%] text-lg font-medium bg-[#FFA800] ${
          Selected && "justify-center"
        } hover:bg-yellow-300 rounded-lg px-5 h-[40px] text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        type="button"
        disabled={state.isSorting}
        onClick={handleDropdownToggle}
      >
        {Selected ? state.AlgoSelected : "Choose Heap-Algo"}
        {!state.isSorting && (
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        )}
      </button>
      <div
        id="dropdown"
        className={`z-10 ${isDropdownOpen ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <a
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
              onClick={() => handleOptionSelect("Min Heap")}
            >
              Min Heap
            </a>
          </li>
          <li>
            <a
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
              onClick={() => handleOptionSelect("Max Heap")}
            >
              Max Heap
            </a>
          </li>
          <li>
            <a
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
              onClick={() => handleOptionSelect("Heap Sort")}
            >
              Heap Sort
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Drop;
