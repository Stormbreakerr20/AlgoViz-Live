import "../Heaps/tree.css";
function Tree({ heapdata, setHeapdata }) {

  const treeRendering = (heapdata, index) => {
    return (
      <>
        {(heapdata[2*index] || heapdata[2*index+1]) && (
          <ul>
            {heapdata[2*index] && (
              <li className={2*index} key={2*index}>
                <div style={{backgroundColor:heapdata[2*index][1]}}>{heapdata[2*index][0]}</div>
                {heapdata.length && heapdata[2*index][0]
                  ? treeRendering(heapdata, 2*index)
                  : ""}
              </li>
            )}
            {heapdata[2*index+1] && (
              <li className={2*index+1} key={2*index+1}>
                <div style={{backgroundColor:heapdata[2*index+1][1]}}>{heapdata[2*index+1][0]}</div>
                {heapdata.length && heapdata[2*index+1][0]
                  ? treeRendering(heapdata, 2*index+1)
                  : ""}
              </li>
            )}
          </ul>
        )}
      </>
    );
  };

  
  return (
    <>
      <div className="tree  flex flex-col text-sm mx-auto  w-[100%] h-[100%] items-center">
        <>
          {heapdata.length === 1?"": (
            <ul>
              {
                <li className={1} key={1}>
                  <div style={{backgroundColor:heapdata[1][1]}}>{heapdata[1][0]}</div>
                  {heapdata.length>2 ? treeRendering(heapdata, 1) : ""}
                </li>
              }
            </ul>
          )}
        </>
      </div>
    </>
  );
}

export default Tree;
