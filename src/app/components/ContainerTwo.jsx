import { useContext, useEffect, useRef } from "react";
import { ContextObj } from "./ContextProvider";

const OnlyUsesTwo = () => {
  const rendersTwo = useRef(1);
  const { two } = useContext(ContextObj);

  useEffect(() => {
    rendersTwo.current = rendersTwo.current + 1;
  });

  return (
    <div className="child" id="child4">
      Clicking on the blue box will update <code>context.one</code>, but this
      component only uses <code>context.two</code>. <br />
      This unoptimized component will rerender unnecessarily: <br />
      <code>context.two</code>: {two}
      <br />
      rendersTwo: {rendersTwo.current}
    </div>
  );
};
const UsesOne = () => {
  const renders = useRef(1);
  const { one, updateContext } = useContext(ContextObj);
  const onClick = () => {
    updateContext({ one: one + 1 });
  };
  useEffect(() => {
    renders.current = renders.current + 1;
  });

  return (
    <div onClick={onClick} className="child" id="child3">
      Clicking here will update <code>context.one</code> by adding 1 to{" "}
      <code>context.one</code>: <br />
      <br />
      <code>context.one</code>: {one}
      <br />
      <br />
      renders: {renders.current}
    </div>
  );
};

const Container = () => {
  return (
    <>
      <h3>
        <code>withContextProvider</code>: unoptimized example
      </h3>
      <code>
        <pre>{`
<ContextProvider>
    <RenderedElements />
</ContextProvider>

`}</pre>
      </code>
      <div id="container2">
        <UsesOne />
        <OnlyUsesTwo />
      </div>
    </>
  );
};

export default Container;
