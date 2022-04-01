import { useContext } from "react";
import React from "react";
//slow fibonacci implementation
function fib(x) {
  if (x <= 0) return 0;
  if (x == 1) return 1;
  return fib(x - 1) + fib(x - 2);
}

const HeavyComponent = ({ contextObj }) => {
  const { fibNum } = useContext(contextObj);
  const answer = fib(fibNum);
  return <div>{answer}</div>;
};

const HeavyComponentPure = ({ fibNum, nonContextProp }) => {
  const answer = fib(fibNum);
  return <div id={nonContextProp}>{answer}</div>;
};

const LightComponent = ({ contextObj }) => {
  const { fibNum } = useContext(contextObj);
  return <div>{fibNum}</div>;
};

const LightComponentPure = ({ fibNum, nonContextProp }) => {
  console.log("consumer rendering");
  return <div id={nonContextProp}>{fibNum}</div>;
};

export {
  HeavyComponent,
  HeavyComponentPure,
  LightComponent,
  LightComponentPure,
};
