import { ContextProvider } from "../src/components/ContextHelper";
import { useContext, createContext } from "react";
import ReactDOM from "react-dom";

const ContextObject = createContext({});

//consumer is light to render, no need for optimization
//if component includes heavy computation, there can be
//unecessary renders if {foo, fizz, updateContext} don't change
const Consumer = () => {
  const { foo, fizz, updateContext } = useContext(ContextObject);

  updateContext({ fizz: fizz + 1 });
  return <div>{foo}</div>;
};

const App = () => {
  return (
    <ContextProvider
      value={{ foo: "bar", fizz: "buzz", one: "two" }}
      contextObj={ContextObject}
    >
      <Consumer />
    </ContextProvider>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
