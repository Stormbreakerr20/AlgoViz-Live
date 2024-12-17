import React, { useState } from "react";
import { state } from "../../../../store";
import { useSnapshot } from "valtio";

function Drop({setDataset,dataSet}) {
  const snap = useSnapshot(state);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [Selected, setSelected] = useState(true);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (dataSetSelected) => {
    setDataset(dataSetSelected)
    setSelected(true)
    setIsDropdownOpen(false);
  };

  return (
    <>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={`text-gray-900 justify-center w-[100%] text-sm font-medium bg-[#FFA800] ${
          Selected && "justify-center"
        } hover:bg-yellow-300 rounded-lg px-5 h-[40px] text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        type="button"
        onClick={handleDropdownToggle}
      >
        {Selected ?  dataSet : "Choose Dataset"}
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
        className={`z-10 ${isDropdownOpen ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow mt-2 mx-auto dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-md flex items-center flex-col text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <a
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
              onClick={() => handleOptionSelect("Dataset-1")}
            >
              Dataset-1
            </a>
          </li>
          <li>
            <a
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
              onClick={() => handleOptionSelect("Dataset-2")}
            >
              Dataset-2
            </a>
          </li>
          <li>
            <a
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
              onClick={() => handleOptionSelect("Dataset-3")}
            >
              Dataset-3
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Drop;
