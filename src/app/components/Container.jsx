import { useContext } from "react";
import { ContextObj } from "../App";

const Container = () => {
  const { one, updateContext } = useContext(ContextObj);

  const onClick = () => updateContext({ one: one + 1 });

  return (
    <div onClick={onClick} id="container">
      <div id="child">{one}</div>
    </div>
  );
};

export default Container;
