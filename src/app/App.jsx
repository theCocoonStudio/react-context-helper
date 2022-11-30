import { createContext, useContext, useEffect } from "react";
/* import { withContextProvider } from "../lib/HOCs/withContextProvider"; */
import { withContextProvider } from "../../dist/react-context-helper";
import Container from "./components/Container";
import "./App.css";

export const ContextObj = createContext({});
export const ContextObjHOC = createContext({});

const CustomProvider = ({ children }) => {
  const { one } = useContext(ContextObj);
  const { ten, updateContext } = useContext(ContextObjHOC);

  useEffect(() => {
    alert("Ones were updated! Updating tens");
    updateContext({ ten: ten + 10 });
  }, [one, updateContext]);

  return children;
};

const WrapProvider = withContextProvider(CustomProvider, ContextObj, {
  one: 1,
  two: 2,
  three: 3,
});

const ProvidedCustomProvider = withContextProvider(
  WrapProvider,
  ContextObjHOC,
  {
    ten: 10,
  },
);

const App = () => {
  return (
    <ProvidedCustomProvider>
      <Container />
    </ProvidedCustomProvider>
  );
};

export default App;
