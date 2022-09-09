export const swap = (array: number[] | string[], curIndex: number, nextIndex: number) => {
    let current = array[curIndex];
    array[curIndex] = array[nextIndex];
    array[nextIndex] = current;
}