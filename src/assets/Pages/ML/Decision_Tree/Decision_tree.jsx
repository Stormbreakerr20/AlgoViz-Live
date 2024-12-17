import React, { useEffect, useState } from "react";
import DatasetDrop from "../RandomForest/DatasetDrop";
import api from "../../../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../components/Loading";

function Dt() {
  const [max_depth, setMaxdepth] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [dataSet, setDataset] = useState("Dataset-1");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const get_data = async (reset) => {
    setLoading(true)
    const result = await api.get(
      `/decision_tree/${dataSet}/${reset}/${max_depth}`
    );
    setLoading(false)
    setImage(result.data.image);
    setAccuracy(result.data.accuracy);
  };

  useEffect(() => {
    get_data(true);
  }, [dataSet]);

  const handleDepth = (e) => {
    setMaxdepth(e.target.value);
  };

  const Refresh = () => {
    get_data(true);
    document.getElementById("depth").value = "";
    setMaxdepth(0);
  };

  const handleSubmit = () => {
    if(max_depth === 0) toast.error("Please enter depth")
    else get_data(false);
  }

  return (
    <div className="flex max-sm:flex-col max-sm:p-3 w-[100%] h-[100%] justify-evenly items-center max-xl:gap-5 ">
      <div className="w-[300px] h-[max-content] rounded-xl justify-between my-1  bg-black flex flex-col  items-center">
        <div className="flex-grow flex flex-col items-center gap-4 p-4 w-[100%]">
          <div className="w-[100%] oveDtlow-visible h-[40px] z-10">
            <DatasetDrop setDataset={setDataset} dataSet={dataSet} />
          </div>
          <div className="flex flex-col text-xs gap-1 justify-start w-[100%] ">
            <label htmlFor="depth" className="text-white">
              Max Depth
            </label>
            <input
              id="depth"
              type="Number"
              className="rounded text-md p-1 px-3"
              placeholder={1}
              onChange={handleDepth}
              min={1}
            />
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
            className=" my-2 mx-2 bg-[#FFA800] justify-center cursor-pointer text-sm font-medium flex hover:bg-yellow-300 rounded-lg px-4 h-[40px] text-center items-center"
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

export default Dt;
