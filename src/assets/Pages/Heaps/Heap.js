const initial = "#0085FF";
const done = "#1BDBAD";
const select = "#FFA800";
const swapped = "#F22C2C";

export const MinHeapInsert = async (element, heapdata, setHeapdata) => {
  const tempheap = [...heapdata, [parseInt(element), initial]];
  let i = tempheap.length - 1;
  await Display_Onscreen(tempheap, setHeapdata, i, select, 1000);
  while (i > 1) {
    let parent = Math.floor(i / 2);
    await Display_Onscreen(tempheap, setHeapdata, parent, select, 1000);
    if (tempheap[parent][0] > tempheap[i][0]) {
      await Display_Onscreen(tempheap, setHeapdata, i, swapped, 500);
      await Display_Onscreen(tempheap, setHeapdata, parent, swapped, 1000);
      [tempheap[parent][0], tempheap[i][0]] = [
        tempheap[i][0],
        tempheap[parent][0],
      ];
      await Display_Onscreen(tempheap, setHeapdata, i, done, 1000);
      await Display_Onscreen(tempheap, setHeapdata, parent, select, 1000);
    } else {
      await Display_Onscreen(tempheap, setHeapdata, i, done, 500);
      await Display_Onscreen(tempheap, setHeapdata, parent, done, 1000);
      setHeapdata((prev) => [...tempheap]);
      break;
    }
    i = parent;
  }
  await Display_Onscreen(tempheap, setHeapdata, i, done, 1000);
};
export const MaxHeapInsert = async (element, heapdata, setHeapdata) => {
  const tempheap = [...heapdata, [parseInt(element), initial]];
  let i = tempheap.length - 1;
  await Display_Onscreen(tempheap, setHeapdata, i, select, 1000);
  while (i > 1) {
    let parent = Math.floor(i / 2);
    await Display_Onscreen(tempheap, setHeapdata, parent, select, 1000);
    if (tempheap[parent][0] < tempheap[i][0]) {
      await Display_Onscreen(tempheap, setHeapdata, i, swapped, 500);
      await Display_Onscreen(tempheap, setHeapdata, parent, swapped, 1000);
      [tempheap[parent][0], tempheap[i][0]] = [
        tempheap[i][0],
        tempheap[parent][0],
      ];
      await Display_Onscreen(tempheap, setHeapdata, i, done, 1000);
      await Display_Onscreen(tempheap, setHeapdata, parent, select, 1000);
    } else {
      await Display_Onscreen(tempheap, setHeapdata, i, done, 500);
      await Display_Onscreen(tempheap, setHeapdata, parent, done, 1000);
      setHeapdata((prev) => [...tempheap]);
      break;
    }
    i = parent;
  }
  await Display_Onscreen(tempheap, setHeapdata, i, done, 1000);
};
export const MaxHeapSort = async (heapData, setHeapData, delay) => {
  const sortedArr = [...heapData];

  // Build max heap
  for (let i = Math.floor(sortedArr.length / 2) ; i >= 1; i--) {
    await Heapify(sortedArr, setHeapData, delay, sortedArr.length, i);
  }
  console.log("jhh")

  // Extract elements from heap one by one
  for (let i = sortedArr.length - 1; i > 1; i--) {
    // Move current root to end
    await Display_Onscreen(sortedArr, setHeapData, 1, select, delay);
    await Display_Onscreen(sortedArr, setHeapData, i, select, delay);
    [sortedArr[1], sortedArr[i]] = [sortedArr[i], sortedArr[1]];
    await Display_Onscreen(sortedArr, setHeapData, 1, swapped, delay);
    await Display_Onscreen(sortedArr, setHeapData, i, initial, delay);

    // call max heapify on the reduced heap
    await Heapify(sortedArr, setHeapData, delay, i , 1);

    // Reset colors after extracting element
    await Display_Onscreen(sortedArr, setHeapData, i, done, delay);
  }

  // Final sorted array
  for (let index = 0; index < sortedArr.length; index++) {
    await Display_Onscreen(sortedArr, setHeapData, index, done, 0);
  }
  setHeapData((prev) => [...sortedArr]);

};

const Heapify = async (sortedArr, setHeapData, delay, n, i) => {
  let largest = i;
  let left = 2 * i;
  let right = 2 * i + 1;

  if (left < n && sortedArr[left][0] > sortedArr[largest][0]) {
    largest = left;
  }

  if (right < n && sortedArr[right][0] > sortedArr[largest][0]) {
    largest = right;
  }

  if (largest !== i) {
    await Display_Onscreen(sortedArr, setHeapData, i, select, delay);
    await Display_Onscreen(sortedArr, setHeapData, largest, select, delay);
    [sortedArr[i], sortedArr[largest]] = [sortedArr[largest], sortedArr[i]];
    await Display_Onscreen(sortedArr, setHeapData, i, swapped, delay);
    await Display_Onscreen(sortedArr, setHeapData, largest, swapped, delay);

    await Heapify(sortedArr, setHeapData, delay, n, largest);
  }
};

const Display_Onscreen = async (tempheap, setHeapdata, i, color, delay) => {
  if (color !== null) tempheap[i][1] = color;
  setHeapdata((prev) => [...tempheap]);
  await new Promise((resolve) => setTimeout(resolve, delay));
};
