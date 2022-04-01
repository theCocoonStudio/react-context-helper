[![npm](https://img.shields.io/npm/v/react-context-helper.svg)](https://www.npmjs.com/package/react-context-helper)

# react-context-helper

This small library provides:

- A wrapper component that helps you easily update your React context from consumers. Works exactly like a regular `Context.Provider` but adds the methods `updateContext` and `removeFromContext` to the context the consumer gets.

- A custom hook, `useMemoConsumer`, that allows you to optimize heavy consumers that would otherwise always update when the context they consume updates, even if the properties they consume don't change.

NOTE: documentation on `useMemoConsumer` is coming soon. Please check out `examples/contextHelperExample.js` for now.

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

## `ContextProvider` props

- `value`: `Object`  
  Identical to the `value` prop for any `Context.Provider`, except for the (current) requirement that it be a regular object.

- `contextObj`: `Context`  
  The React `Context` that the consumer will be consuming.

  Example:

```js
//snippet from Context.js
const initial = { foo: "bar", fizz: { buzz: { fizz: "buzz" } } };
const context = createContext(initial);
export default context;
//

//snippet from App.js
import context from "path/to/context";

const App = () => {
  return (
    <ContextProvider contextObj={context} value={initialValue}>
      <ChildWithConsumers />
    </ContextProvider>
  );
};
//
```

## Functions added to the context object

The context value is assumed to be a regular object. An upcoming version will work for arrays and primitives as well.

The context provided by `ContextProvider` includes two methods which allow you to modify your context as necessary:

(Note: these functions wrap `setState` calls, which are asynchoronous.)

### `updateContext(updateObject)`

Parameters:

- `updateObject`: `Object`  
  an Object to merge with the current context. Any properties that are already in the context object are overriden, and any properties that aren't are added.

Return value:

- void

```js
//snippet from Context.js
const initial = { foo: "bar", fizz: { buzz: { fizz: "buzz" } } };
const context = createContext(initial);
export default context;
//

//snippet from Consumer.js
import context from "path/to/context";
const consumedContext = useContext(context);

/*
changes context to
{ foo: "bar", fizz: { buzz: "fizz"}, bar: "foo" }
*/
consumedContext.updateContext({ fizz: { buzz: "fizz" }, bar: "foo" });

//
```

### `removeFromContext(keyArray)`

Parameters:

- `keyArray`: `Array<string>`:  
  an array of keys (strings) to properties that will be removed from the context object.

Return value:

- void

```js
//snippet from Context.js
const initial = { foo: "bar", fizz: { buzz: { fizz: "buzz" } } };
const context = createContext(initial);
export default context;
//

//snippet from Consumer.js
import context from "path/to/context";
const consumedContext = useContext(context);

/* 
changes context to 
{ foo: "bar" } 
*/
consumedContext.removeFromContext(["fizz"]);

//
```
