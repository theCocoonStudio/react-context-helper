import { useContext } from "react";
import { ContextObj, ContextObjHOC } from "../App";

const Container = () => {
  const { one, updateContext } = useContext(ContextObj);
  const { ten, updateContext: updateOtherContext } = useContext(ContextObjHOC);

  const onClick = () => updateContext({ one: one + 1 });
  const onOtherClick = () => updateOtherContext({ ten: ten + 10 });

  return (
    <div id="container">
      <div onClick={onClick} className="child">
        {one}
      </div>
      <div onClick={onOtherClick} className="child">
        {ten}
      </div>
    </div>
  );
};

export default Container;
