import Container from "./components/Container";
import { composeProviders } from "../../dist/react-context-helper";
// import { composeProviders } from "../lib/main";
import CustomProvider from "./components/CustomProvider";
import ContextProvider from "./components/ContextProvider";
import "./App.css";

const Provider = composeProviders(CustomProvider, ContextProvider);

const App = () => {
  return (
    <Provider>
      <Container />
    </Provider>
  );
};

export default App;
