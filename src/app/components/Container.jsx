import { useContext } from "react";
import { ContextObj } from "./ContextProvider";
import { ContextObj as CustomContextObj } from "./CustomProvider";

const Container = () => {
  const { one, updateContext } = useContext(CustomContextObj);
  const { one: otherOne } = useContext(ContextObj);

  const onClick = () => updateContext({ one: one + 1 });

  return (
    <div id="container">
      <div onClick={onClick} className="child">
        Clicking here will add one to this number: {one}
      </div>
      <div className="child">
        Clicking on the other box will trigger a custom provider to add one to
        this number: {otherOne}
      </div>
    </div>
  );
};

export default Container;
