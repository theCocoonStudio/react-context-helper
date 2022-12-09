import { createContext } from "react";
// import { ContextProvider, withContextProvider } from "../../lib/main";
import {
  ContextProvider,
  withContextProvider,
} from "../../../dist/react-context-helper";

export const ContextObj = createContext({});

export default withContextProvider(ContextProvider, ContextObj, {
  one: 1,
  two: 2,
  three: 3,
});
