[![npm](https://img.shields.io/npm/v/react-context-helper.svg)](https://www.npmjs.com/package/react-context-helper)

# react-context-helper

A component that helps you easily update your React context from consumers.

## Install:

`npm i react-context-helper`

## Example Usage

```js
import { createContext, useContext } from "react";
import { ContextProvider } from "react-context-helper";

const context = createContext({});

const Consumer = () => {
  const consumedContext = useContext(context);

  /* changes context to { message: "hello context!", bar: 2} */
  consumedContext.updateContext({ message: "hello context!" });
  consumedContext.removeFromContext(["foo"]);

  // output: hello context!
  return <div>{consumedContext.message}</div>;
};

const App = () => {
  return (
    <ContextProvider
      contextObj={context}
      value={{ message: "hello world", foo: 1, bar: 2 }}
    >
      <Consumer />
    </ContextProvider>
  );
};
```
