import React, { useState } from "react";
import { state } from "../../../store";
import { useSnapshot } from "valtio";
import "react-dropdown/style.css";
import Drop from "./Drop";
import { MdSpeed } from "react-icons/md";
import { CgSize } from "react-icons/cg";
import { BsGooglePlay, BsStopBtn } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  InsertionSort,
  BubbleSort,
  SelectionSort,
  MergeSort,
  QuickSort,
} from "./SortingAlgos";

function Buttons({ arr, setArr }) {
  const [rangeValue, setRangeValue] = useState(20);
  const [speedValue, setSpeedValue] = useState(7);
  const snap = useSnapshot(state);

  const handleRangeChange = (e) => {
    state.ArraySize = e.target.value;
    setRangeValue(e.target.value);
  };

  const Startsorting = async () => {
    state.isRunning = true;
    switch (state.AlgoSelected) {
      case "Insertion":
        await InsertionSort(arr, setArr, state.delay);
        toast.success("Hurray! Your Array is now Sorted ");
        break;
      case "Bubble":
        await BubbleSort(arr, setArr, state.delay);
        toast.success("Hurray! Your Array is now Sorted ");
        break;
      case "Selection":
        await SelectionSort(arr, setArr, state.delay);
        toast.success("Hurray! Your Array is now Sorted ");
        break;
      case "Merge":
        await MergeSort(arr, setArr, state.delay);
        toast.success("Hurray! Your Array is now Sorted ");
        break;
      case "Quick":
        await QuickSort(arr, setArr, state.delay);
        toast.success("Hurray! Your Array is now Sorted ");
        break;
      default:
        toast.error("Please Choose an Algorithm!");
    }
    state.isRunning = false;
  };

  const handleSpeedChange = (e) => {
    const minSpeed = 5;
    let maxSpeed = 10;
    const minDelay = state.ArraySize > 80 ? 0 : 15;
    const maxDelay = 1000;

    if (
      state.ArraySize > 80 ||
      (window.innerWidth < 800 && state.ArraySize >= 20)
    ) {
      maxSpeed = 7;
    } else if (
      state.ArraySize < 50 ||
      (window.innerWidth < 800 && state.ArraySize < 15)
    ) {
      maxSpeed = 12;
    }

    const speedValue = parseInt(e.target.value, 10);
    const delay =
      ((maxSpeed - speedValue) / (maxSpeed - minSpeed)) *
        (maxDelay - minDelay) +
      minDelay;

    state.delay = delay;
    setSpeedValue(speedValue);
  };
  const refresh = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="flex justify-between w-[100%] gap-3 max-xl:flex-col max-xl:w-[80%] max-[880px]:w-[100%]">
        <div className="flex gap-3 flex-grow max-xl:w-[100%] max-sm:flex-col">
          <div className=" shadow-md flex-grow max-xl:w-[50%] max-sm:w-[100%] h-[40px] bg-[#FFA800] rounded-lg flex justify-evenly items-center ">
            <label
              htmlFor="steps-range"
              className="block mb-1 text-lg font-medium text-gray-900 dark:text-white"
            >
              <span className="flex justify-center items-center gap-3">
                <span className=" text-2xl ">
                  <CgSize />
                </span>
                <span>Array Size</span>
              </span>
            </label>
            <input
              disabled={state.isRunning}
              id="steps-range"
              type="range"
              min="10"
              max={
                window.innerWidth < 800
                  ? window.innerWidth < 550
                    ? "60"
                    : "80"
                  : "150"
              }
              value={rangeValue}
              step="5"
              className="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 max-md:w-[40%]"
              onChange={handleRangeChange}
            />
          </div>
          <div className="flex-grow shadow-md h-[40px] max-xl:w-[50%] max-sm:w-[100%] bg-[#FFA800] rounded-lg flex justify-evenly items-center">
            <label
              htmlFor="speed"
              className="block mb-1 text-lg font-medium text-gray-900 dark:text-white"
            >
              <span className="flex justify-center items-center gap-3 ">
                <span className=" text-2xl ">
                  <MdSpeed />
                </span>
                <span>Algo Speed</span>
              </span>
            </label>
            <input
              disabled={state.isRunning}
              id="speed"
              type="range"
              min="5"
              max="10"
              value={speedValue}
              step="1"
              className="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700  max-md:w-[40%]"
              onChange={handleSpeedChange}
            />
          </div>
        </div>
        <div className="flex gap-3 flex-grow max-xl:w-[100%] max-sm:flex-col">
          <div className="flex-grow shadow-md h-[40px] max-xl:w-[50%] max-sm:w-[100%]  rounded-lg z-50">
            <Drop />
          </div>
          <div
            onClick={state.isRunning ? null : Startsorting}
            className="max-sm:w-[100%] shadow-md flex-grow h-[40px] bg-[#FFA800] rounded-lg flex justify-evenly items-center max-xl:w-[50%]"
          >
            <span className="flex  justify-center items-center gap-3 mb-1  text-lg font-medium text-gray-900 cursor-pointer">
              <span>{state.isRunning ? "Sorting" : "Start"}</span>
              <span className={`text-lg ${state.isRunning ? "blinking" : ""}`}>
                <BsGooglePlay />
              </span>
            </span>
          </div>
          {state.isRunning && (
            <div
              onClick={state.isRunning ? refresh : Startsorting}
              className="max-sm:w-[100%] shadow-md flex-grow h-[40px] bg-[#FFA800] rounded-lg flex justify-evenly items-center max-xl:w-[50%]"
            >
              <span className="flex  justify-center items-center gap-3 mb-1  text-lg font-medium text-gray-900 cursor-pointer">
                <span>Stop</span>
                <span className={`text-lg`}>
                  <BsStopBtn />
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Buttons;
