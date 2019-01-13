export const SVG_XMLNS = "http://www.w3.org/2000/svg";
export const B = 1;
export const W = -1;

export function allocateTable(size, initValue=undefined) {
  const tbl = new Array(size);
  for(let i = 0; i < size; i++) {
    tbl[i] = (new Array(size)).fill(initValue);
  }
  return tbl;
}