[![npm](https://img.shields.io/npm/v/react-context-helper.svg)](https://www.npmjs.com/package/react-context-helper)

# react-context-helper

A wrapper component that helps you easily update your React context from consumers. Works exactly like a regular context provider but adds the methods `updateContext` and `removeFromContext` to the context object.

## Install:

`npm i react-context-helper`

## Example Usage

```js
import { createContext, useContext } from "react";
import { ContextProvider } from "react-context-helper";

const context = createContext({});

const Consumer = () => {
  const consumedContext = useContext(context);

  /* changes context to { message: "hello context!", fizz: "buzz"} */
  consumedContext.updateContext({ message: "hello context!" });
  consumedContext.removeFromContext(["foo"]);

  // output: hello context!
  return <div>{consumedContext.message}</div>;
};

const App = () => {
  return (
    <ContextProvider
      contextObj={context}
      value={{ message: "hello world", foo: "bar", fizz: "buzz" }}
    >
      <Consumer />
    </ContextProvider>
  );
};
```

## API

Your context is assumed to be a regular object. The context provided by `ContextProvider` adds two functions to your context that allow you to modify your object as necessary.

Note: these functions wrap `setState` calls which are asynchoronous.

### `updateContext(updateObject)`

Parameters:

- updateObject: Object  
  an Object to merge with your current context. Any properties that are already in the context object are overriden, and any properties that aren't are added.

Return value:

- void

```js
//within your consumer component
const initial = { foo: "bar", fizz: { buzz: { fizz: "buzz" } } };
const context = createContext(initial);
const consumedContext = useContext(context);

/* 
changes context to 
{ foo: "bar", fizz: { buzz: "fizz"}, bar: "foo" } 
*/
consumedContext.updateContext({ fizz: { buzz: "fizz" }, bar: "foo" });
```

### `removeFromContext([keyArray])`

Parameters:

- keyArray: Array<string>  
  an array of keys (strings) to properties that will be removed from the context object.

Return value:

- void

```js
//within your consumer component
const initial = { foo: "bar", fizz: { buzz: { fizz: "buzz" } } };
const context = createContext(initial);
const consumedContext = useContext(context);

/* 
changes context to 
{ foo: "bar" } 
*/
consumedContext.removeFromContext(["fizz"]);
```
