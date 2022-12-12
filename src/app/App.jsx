import Container from "./components/Container";
import ContainerTwo from "./components/ContainerTwo";
import { composeProviders } from "../../dist/react-context-helper";
// import { composeProviders } from "../lib/main";
import CustomProvider from "./components/CustomProvider";
import ContextProvider from "./components/ContextProvider";
import "./App.scss";

const Provider = composeProviders(CustomProvider, ContextProvider);

const App = () => {
  return (
    <>
      <Provider>
        <Container />
      </Provider>
      <ContextProvider>
        <ContainerTwo />
      </ContextProvider>
    </>
  );
};

export default App;
