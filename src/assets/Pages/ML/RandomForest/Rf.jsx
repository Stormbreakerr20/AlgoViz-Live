import React, { useEffect, useState } from "react";
import DatasetDrop from "./DatasetDrop";
import api from "../../../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../components/Loading";

function Rf() {
  const [estimators, setEstimators] = useState(0);
  const [bootstrap, setbootstrap] = useState(false);
  const [max_samples, setMax_samples] = useState(1);
  const [accuracy, setAccuracy] = useState(0);
  const [dataSet, setDataset] = useState("Dataset-1");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const get_data = async (reset) => {
    setLoading(true)
    const result = await api.get(
      `/random_forest/${estimators}/${bootstrap}/${dataSet}/${reset}/${max_samples}`
    );
    setLoading(false)
    setImage(result.data.image);
    setAccuracy(result.data.accuracy);
  };

  useEffect(() => {
    get_data(true);
  }, [dataSet]);

  const handleEstimators = (e) => {
    setEstimators(e.target.value);
  };
  const handleMaxSamples = (e) => {
    setMax_samples(e.target.value);
  };

  const Refresh = () => {
    setEstimators(0);
    setMax_samples(1);
    get_data(true);
    document.getElementById("est").value = "";
    setbootstrap(false);
    document.getElementById("checkbox").prop("checked", false);
  };

  const handleSubmit = () => {
    console.log(estimators)
    if(estimators === 0) toast.error("Please enter number of estimators")
    else get_data(false);
  }

  return (
    <div className="flex max-sm:flex-col w-[100%] h-[100%] justify-evenly items-center max-xl:gap-5 ">
      <div className="w-[300px] h-[max-content] rounded-xl justify-between my-1  bg-black flex flex-col  items-center">
        <div className="flex-grow flex flex-col items-center gap-4 p-4 w-[100%]">
          <div className="w-[100%] overflow-visible h-[40px] z-10">
            <DatasetDrop setDataset={setDataset} dataSet={dataSet} />
          </div>
          <div className="flex flex-col text-xs gap-1 justify-start w-[100%] ">
            <label htmlFor="degree" className="text-white">
              Num Estimators
            </label>
            <input
              id="est"
              type="Number"
              className="rounded text-md p-1 px-3"
              placeholder={1}
              onChange={handleEstimators}
              min={1}
            />
          </div>
          <div className="flex items-center w-[100%] px-1 gap-4  justify-between ">
            <div className=" items-center flex ">
              <input
                id="checkbox"
                type="checkbox"
                className="w-4 h-4  cursor-pointer rounded-sm text-[#FFA800] focus:ring-black focus:border-none"
                onChange={() => setbootstrap((prev) => !prev)}
                checked={bootstrap}
              />
              <label
                for="checked-checkbox"
                className="ms-2 text-sm font-medium text-white"
              >
                Bootstrap
              </label>
            </div>
            <div className="relative mb-2 text-xs  ">
              <label for="labels-range-input" className="text-white">
                Max Samples
              </label>
              <input
                id="labels-range-input"
                type="range"
                min="1"
                max="375"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                onChange={handleMaxSamples}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                1
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                375
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-xs justify-start w-[100%] ">
            <label htmlFor="degree" className="text-white">
              Accuracy of the model
            </label>
            <input
              id="est"
              type="text"
              className="rounded text-md p-1 px-3"
              disabled
              value={(accuracy * 100).toLocaleString() + " %"}
            />
          </div>
        </div>
        <div className="flex">
          <div
            onClick={handleSubmit}
            className=" my-2 mx-2 bg-[#FFA800] justify-center cursor-pointer text-sm font-medium flex hover:bg-yellow-300 rounded-lg px-4 h-[40px] text-center items-center"
          >
            Run
          </div>
          <div
            onClick={Refresh}
            id="refresh"
            className=" my-2 mx-2  bg-[#FFA800] justify-center cursor-pointer text-sm font-medium flex hover:bg-yellow-300 rounded-lg px-4 h-[40px] text-center items-center"
          >
            Refresh
          </div>
        </div>
      </div>
      <div className=" flex justify-center items-center ">
        {loading? <Loading/> : (
          <img
            className="w-[70%] max-xl:w-[80%] max-sm:w-[90%] h-[auto] rounded-lg shadow-lg"
            src={`data:image/png;base64,${image}`}
            alt="Classification Image"
          />
        )}
      </div>
    </div>
  );
}

export default Rf;
