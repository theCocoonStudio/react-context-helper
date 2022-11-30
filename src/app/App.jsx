import { createContext } from "react";
// import { ContextProvider } from "../lib/main";
import { ContextProvider } from "../../dist/react-context-helper";
import Container from "./components/Container";
import "./App.css";

export const ContextObj = createContext({});

const CustomProvider = ({ children }) => {
  const value = { one: 1, two: 2, three: 3 };
  return (
    <ContextProvider value={value} contextObj={ContextObj}>
      {children}
    </ContextProvider>
  );
};

const App = () => {
  return (
    <CustomProvider>
      <Container />
    </CustomProvider>
  );
};

export default App;
