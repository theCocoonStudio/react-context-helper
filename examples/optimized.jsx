import {
  ContextProvider,
  useMemoConsumer,
} from "../src/components/ContextHelper";
import { createContext } from "react";
import ReactDOM from "react-dom";

const ContextObject = createContext({});

//pure function and also includes heavy computation
const PureConsumer = ({ foo, nonContextProp }) => {
  //e.g. foo = heavyComputation(foo);
  return <div className={nonContextProp}>{foo}</div>;
};

const App = () => {
  const [MemoizedPureConsumer, contextProps] = useMemoConsumer(
    PureConsumer,
    ContextObject,
    ["foo"],
  );
  return (
    <ContextProvider
      value={{ foo: "bar", fizz: "buzz" }}
      contextObj={ContextObject}
    >
      <MemoizedPureConsumer {...contextProps} nonContextProp="someClassName" />
    </ContextProvider>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
