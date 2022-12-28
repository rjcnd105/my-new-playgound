import * as d3 from "d3";

export default {
  title: "d3-scale",
};

// scale Linear
// Linear하게 0 - 200의 수치를 받아 0 - 20의 값으로 변환
const myScale = d3.scaleLinear().domain([0, 200]).range([0, 20]);

myScale; /*?*/

console.log(myScale(132), "myScale(132)"); // 13.200000000000001
export const Scale = () => {
  myScale(10); /*?*/

  return <div>hihi</div>;
};
