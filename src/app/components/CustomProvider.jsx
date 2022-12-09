import { createContext, useContext, useEffect } from "react";
// import { withContextProvider } from "../../lib/main";
import { withContextProvider } from "../../../dist/react-context-helper";
import { ContextObj as OtherContextObj } from "./ContextProvider";

export const ContextObj = createContext({});

const CustomProvider = ({ children }) => {
  const { one } = useContext(ContextObj);
  const { one: otherOne, updateContext } = useContext(OtherContextObj);

  useEffect(() => {
    updateContext({ one: otherOne === one ? otherOne : otherOne + 1 });
  }, [one, updateContext]);

  return children;
};

export default withContextProvider(CustomProvider, ContextObj, {
  one: 1,
  two: 2,
  three: 3,
});
