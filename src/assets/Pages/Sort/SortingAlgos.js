const initial = "#0085FF"
const done = "#1BDBAD"
const select = "#FFA800"
const swapped = "#F22C2C"

export const InsertionSort = async (arr, setArr, delay) => {
  const sortedArr = [...arr];
  for (let i = 1; i < arr.length; i++) {
    const currentElement = sortedArr[i][0];
    let j = i - 1;
    await Display_Onscreen(sortedArr, setArr, i, 1, select, delay);
    while (j >= 0 && sortedArr[j][0] > currentElement) {
      await Display_Onscreen(sortedArr, setArr, j, 1, select, delay);
      sortedArr[j + 1][0] = sortedArr[j][0];
      j--;
      await Display_Onscreen(sortedArr, setArr, j + 2, 1, swapped, delay);
    }
    sortedArr[j + 1][0] = currentElement;
    await Display_Onscreen(sortedArr, setArr, j + 1, 1, swapped, delay);
    for (let k = (j>=0?j:j+1); k < i; k++) {
      await Display_Onscreen(sortedArr, setArr, k, 1, done, delay);
    }
    await Display_Onscreen(sortedArr, setArr, i, 1, done, delay);
  }
  sortedArr[arr.length - 1][1] = done;
  setArr((prev) => [...sortedArr]);
};

export const BubbleSort = async (arr, setArr, delay) => {
  const sortedArr = [...arr];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (sortedArr[j] > sortedArr[j + 1]) {
        await Display_Onscreen(sortedArr, setArr, j, 1, select, delay);
        await Display_Onscreen(sortedArr, setArr, j + 1, 1, select, delay);
        [sortedArr[j], sortedArr[j + 1]] = [sortedArr[j + 1], sortedArr[j]];
        await Display_Onscreen(sortedArr, setArr, j, 1, swapped, delay);
      }
    }
    await Display_Onscreen(sortedArr,setArr,arr.length - i - 1,1,done,delay);
    for (let j = 0; j < arr.length - i - 1; j++) {
      await Display_Onscreen(sortedArr, setArr, j, 1, initial, delay);
    }
    await Display_Onscreen(sortedArr, setArr, 0, 1, null, delay);
  }
  setArr((prev) => [...sortedArr]);
};

export const SelectionSort = async (arr, setArr, delay) =>{
  const sortedArr = [...arr];
  for(let i = 0;i<arr.length-1;i++){
    let mini = i;
    await Display_Onscreen(sortedArr,setArr,i,1,select,delay);
    for(let j = i+1;j<arr.length;j++){
      if(sortedArr[mini] > sortedArr[j]){
        await Display_Onscreen(sortedArr,setArr,mini,1,initial,delay)
        mini = j;
        await Display_Onscreen(sortedArr,setArr,j,1,select,delay)
      }
    }
    [sortedArr[mini], sortedArr[i]] = [sortedArr[i], sortedArr[mini]];
    await Display_Onscreen(sortedArr,setArr,i,1,done,delay)
    if(mini!=i) await Display_Onscreen(sortedArr,setArr,mini,1,initial,delay)
  }
  await Display_Onscreen(sortedArr,setArr,arr.length - 1,1,done,delay)
}

export const MergeSort = async (arr, setArr, delay) => {
  const sortedArr = [...arr];
  await Break(sortedArr, setArr, delay, 0, arr.length - 1);
};
const Break = async (sortedArr, setArr, delay, start, end) => {
  if (start >= end) {
    await Display_Onscreen(sortedArr, setArr, start, 1, swapped, delay);
    return;
  }

  const mid = Math.floor(start + (end - start) / 2);
  await Display_Onscreen(sortedArr, setArr, mid, 1, select, delay);

  await Break(sortedArr, setArr, delay, start, mid);
  await Break(sortedArr, setArr, delay, mid + 1, end);

  await Merge(sortedArr, setArr, delay, start, mid, end);
};
const Merge = async (sortedArr, setArr, delay, start, mid, end) => {
  const leftArray = sortedArr.slice(start, mid + 1);
  const rightArray = sortedArr.slice(mid + 1, end + 1);

  let p1 = 0;
  let p2 = 0;
  let p = start;

  while (p1 < leftArray.length && p2 < rightArray.length) {
    await Display_Onscreen(sortedArr, setArr, start + p1, 1, select, delay);
    await Display_Onscreen(sortedArr, setArr, mid + 1 + p2, 1, select, delay);

    if (leftArray[p1] <= rightArray[p2]) {
      sortedArr[p] = leftArray[p1];
      p1++;
    } else {
      sortedArr[p] = rightArray[p2];
      p2++;
    }
    p++;
  }

  while (p1 < leftArray.length) {
    sortedArr[p] = leftArray[p1];
    p1++;
    p++;
  }

  while (p2 < rightArray.length) {
    sortedArr[p] = rightArray[p2];
    p2++;
    p++;
  }
  for (let i = start; i <= end; i++) {
    await Display_Onscreen(sortedArr, setArr, i, 1, done, delay);
  }
};

export const QuickSort = async (arr, setArr, delay) => {
  const sortedArr = [...arr];
  await Sort(sortedArr, setArr, delay, 0, arr.length - 1);
};

const Sort = async (sortedArr, setArr, delay, low, high) => {
  if (low < high) {
    const pivotIndex = await Partition(sortedArr, setArr, delay, low, high);
    await Sort(sortedArr, setArr, delay, low, pivotIndex - 1);
    await Sort(sortedArr, setArr, delay, pivotIndex + 1, high);
  }
  else if(low === high) {
    await Display_Onscreen(sortedArr,setArr,low,1,done,delay);
    return;
  }
};

const Partition = async (sortedArr, setArr, delay, low, high) => {
  const pivot = low
  let i = low;
  let j = high;
  await Display_Onscreen(sortedArr,setArr,low,1,"white",delay)

  while(i<j){
    await Display_Onscreen(sortedArr,setArr,i,1,select,delay);
    await Display_Onscreen(sortedArr,setArr,j,1,select,delay);
    while(i<high && sortedArr[i][0] <= sortedArr[pivot][0]){
      if(i == pivot)await Display_Onscreen(sortedArr,setArr,i,1,"white",delay);
      else await Display_Onscreen(sortedArr,setArr,i,1,initial,(sortedArr.length > 60?0:delay/20));
      i++;
      if(i<high) await Display_Onscreen(sortedArr,setArr,i,1,select,(sortedArr.length > 60?0:delay/20));
    }
    while(j>low && sortedArr[j][0] > sortedArr[pivot][0]){
      await Display_Onscreen(sortedArr,setArr,j,1,initial,(sortedArr.length > 60?0:delay/20));
      j--;
      if(j>low) await Display_Onscreen(sortedArr,setArr,j,1,select,(sortedArr.length > 60?0:delay/20));
    }
    if(i<j){
      await Display_Onscreen(sortedArr,setArr,j,1,select,0);
      await Display_Onscreen(sortedArr,setArr,i,1,select,delay);
      [sortedArr[j], sortedArr[i]] = [sortedArr[i], sortedArr[j]];
      await Display_Onscreen(sortedArr,setArr,j,1,swapped,0);
      await Display_Onscreen(sortedArr,setArr,i,1,swapped,delay);
      if(i == pivot) await Display_Onscreen(sortedArr,setArr,i,1,"white",delay);
    }
  }
  [sortedArr[j], sortedArr[pivot]] = [sortedArr[pivot], sortedArr[j]];
  Display_Onscreen(sortedArr,setArr,pivot,1,initial,delay);
  Display_Onscreen(sortedArr,setArr,j,1,done,delay);

  return j;

};

const Display_Onscreen = async (sortedArr, setArr, i, j, color, delay) => {
  if (color !== null) sortedArr[i][1] = color;
  setArr((prev) => [...sortedArr]);
  await new Promise((resolve) => setTimeout(resolve, delay));
};
