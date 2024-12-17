import React, { useEffect, useState } from "react";
import Reg_Drop from "./Reg_Drop";
import DatasetDrop from "../RandomForest/DatasetDrop";
import api from "../../../../api";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Regression() {
  const [reg_type, setReg_type] = useState("Standard");
  const [degree, setDegree] = useState(0);
  const [reg_image, setReg_image] = useState(null);
  const [accuracy, setAccuracy] = useState(0);
  const [dataSet, setDataset] = useState("Dataset-1");
  const [loading, setLoading] = useState(false);

  const get_data_degree = async (reset) => {
    setLoading(true);
    if (reset) {
      const result = await api.get(`/regression/0/${dataSet}/${reg_type}`);
      setReg_image(result.data.image);
      setAccuracy(result.data.accuracy);
    } else {
      const result = await api.get(
        `/regression/${degree}/${dataSet}/${reg_type}`
      );
      setReg_image(result.data.image);
      setAccuracy(result.data.accuracy);
    }
    setLoading(false);
  };

  useEffect(() => {
    get_data_degree(false);
  }, [dataSet]);

  const handleChange = (e) => {
    setDegree(e.target.value);
  };

  const Refresh = () => {
    document.getElementById("degree").value = "";
    setDegree(0);
    get_data_degree(true);
  };
  const handleSubmit = () => {
    if (degree === 0) toast.error("Please enter degree");
    else get_data_degree(false);
  }

  return (
    <div className="flex max-sm:flex-col w-[100%] h-[100%]  justify-evenly items-center max-xl:gap-5 ">
      <div className="w-[300px] h-[max-content] rounded-xl justify-between my-1  bg-black flex flex-col  items-center">
        <div className="flex-grow flex flex-col items-center gap-4 p-4 w-[100%]">
          <div className="w-[100%] overflow-visible h-[40px] z-20">
            <Reg_Drop setReg_type={setReg_type} reg_type={reg_type} />
          </div>
          <div className="w-[100%] overflow-visible h-[40px] z-10">
            <DatasetDrop setDataset={setDataset} dataSet={dataSet} />
          </div>
          <div className="flex flex-col text-xs gap-1 justify-start w-[100%] ">
            <label htmlFor="degree" className="text-white">
              Enter degree for Regression
            </label>
            <input
              id="degree"
              type="Number"
              className="rounded text-md p-1 px-3"
              placeholder={degree}
              onChange={handleChange}
              min={1}
            />
          </div>
          
          <div className="flex flex-col gap-1 text-xs justify-start w-[100%] ">
            <label htmlFor="degree" className="text-white">
              Accuracy of the model
            </label>
            <input
              id="degree"
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
        {loading?<Loading/>: (
          <img
            className=" w-[70%] max-xl:w-[80%] max-sm:w-[90%] h-[auto]   rounded-lg shadow-lg"
            src={`data:image/png;base64,${reg_image}`}
            alt="Regression Image"
          />
        )}
      </div>
    </div>
  );
}

export default Regression;
