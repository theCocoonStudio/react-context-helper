[![npm](https://img.shields.io/npm/v/react-context-helper.svg)](https://www.npmjs.com/package/react-context-helper)

# react-context-helper

This tiny library includes:

- **`ContextProvider`** and **`ContextReducerProvider`** : Custom Context Providers that help you easily update your React context from consumers in a standard way. Works exactly like a regular `Context.Provider` but adds the methods `updateContext` and `removeFromContext` (alternatively, a `dispatch` method) to the context consumers get.

- **`useMemoConsumer`** A custom hook that allows you to optimize heavier consumers that would otherwise always update when the context they consume updates, _even if the context properties they consume don't change_.

The components and hook can be used independently or together.

**Note**: Currently supports regular object context types only.

## Install:

`npm i react-context-helper`

`yarn add react-context-helper`

## What it solves

### 1) The Context API doesn't provide a simple and/or standard way to update context

### 2) Context can cause unnecessary rerenders

Context consumers get rerendered when the context is updated -- even when they don't use the part of the context that has changed.

E.g., given the following initial context value,

```js
{ foo: "bar", fizz: "buzz", updateFizz: () => {...} }
```

the following component will rerender when the context is updated by running `updateFizz` (e.g., from another consumer). Note that only `fizz`, not `foo`, is updated. This component will rerender even though it only uses `foo`.

```js
const Consumer = () => {
  const { foo } = useContext(Context);
  return <div>{foo}</div>;
};
```

This can cause _a lot_ of undesired rendering time.

The ideal way to avoid this problem is to create multiple contexts, ensuring that each consumer needs all entries in the context it consumes. If this isn't possible, an optimization can be made using `useMemoConsumer`.

Tests confirm that optimizing both light and heavy components with `useMemoConsumer` increases performance. This is clearly more pronounced with heavier components.

## <ins>`ContextProvider` API</ins>

### Example Usage

```js
import { createContext, useContext } from "react";
import { ContextProvider } from "react-context-helper";

const context = createContext({});

const Consumer = () => {
  const { message, updateContext, removeFromContext } = useContext(context);

  /* changes context to { message: "hello context!", fizz: "buzz"}(plus update functions) */
  updateContext({ message: "hello context!" });
  removeFromContext(["foo"]);

  // output: hello context!
  return <div>{message}</div>;
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

### Props

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

### Functions added to the context object

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
(plus update functions) */
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
{ foo: "bar" }  (plus update functions)
*/
consumedContext.removeFromContext(["fizz"]);

//
```

## <ins>`ContextReducerProvider` API</ins>

Reducers are a familiar pattern used in state management libraries like [Redux](https://redux.js.org). Using a reducer can simplify and organize the logic of context updates.

This component uses [`immer`](https://immerjs.github.io/immer/) under the hood, allowing users to mutate the previous state directly instead of the traditional React pattern of having to return a new state object.

### Example Usage

```js
import { createContext, useContext } from "react";
import { ContextReducerProvider } from "react-context-helper";

const context = createContext({});

const Consumer = () => {
  const { message, dispatch } = useContext(context);

  /* changes context to { message: "hello context!", fizz: "buzz"} (plus dispatch function) */
  dispatch({ type: "update", payload: { message: "hello context" } });
  dispatch({ type: "remove", payload: ["foo"] });

  // output: hello context!
  return <div>{message}</div>;
};

//takes a draft parameter (the current context) and the dispatched action
const reducer = (draft, action) => {
  switch (action.type) {
    case "update":
      Object.assign(draft, action.payload);
      break;
    case "remove":
      action.payload.forEach((key) => {
        delete draft[key];
      });
      break;
    default:
      break;
  }
};

const App = () => {
  return (
    <ContextReducerProvider
      contextObj={context}
      value={{ message: "hello world", foo: "bar", fizz: "buzz" }}
      reducer={reducer}
    >
      <Consumer />
    </ContextReducerProvider>
  );
};
```

### Props

- `value`: `Object`  
  Identical to the `value` prop for any `Context.Provider`, except for the (current) requirement that it be a regular object.

- `contextObj`: `Context`  
  The React `Context` that the consumer will be consuming.

- `reducer`: `Function`  
  A reducer function to update the context based on dispatched actions. Accepts two arguments, `draft` and `action`. This is identical to the reducer passed to [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer) except that by using [`immer`](https://github.com/immerjs/immer) under the hood, it allows you to mutate `draft` directly, simplifying updates considerably.

  Example:

```js
//snippet from Context.js
const initial = { foo: "bar", fizz: { buzz: { fizz: "buzz" } } };
const context = createContext(initial);
export default context;
//

//snippet from App.js
import context from "path/to/context";

const reducer = (draft, action) => {
  switch (action.type) {
    case "update":
      Object.assign(draft, action.payload);
      break;
    case "remove":
      action.payload.forEach((key) => {
        delete draft[key];
      });
      break;
    default:
      break;
  }
};

const App = () => {
  return (
    <ContextReducerProvider
      contextObj={context}
      value={initialValue}
      reducer={reducer}
    >
      <ChildWithConsumers />
    </ContextReducerProvider>
  );
};
//
```

### `Dispatch` function added to the context object

The context value is assumed to be a regular object. An upcoming version will work for arrays and primitives as well.

The context provided by `ContextReducerProvider` includes a `dispatch` function which allows you to dispatch actions to your reducer in order to change your context as necessary:

### `dispatch(action)`

Parameters:

- `draft`: `Object`  
  the current context (internally stored in state)
- `action`: `Object`  
  the action that was dispatched by `dispatch`

Return value:

- void

```js
//snippet from Context.js
const initial = { foo: "bar", fizz: "buzz" };
const context = createContext(initial);
export default context;
//

//snippet from App.js
const reducer = (draft, action) => {
  switch (action.type) {
    case "update":
      Object.assign(draft, action.payload);
      break;
    case "remove":
      action.payload.forEach((key) => {
        delete draft[key];
      });
      break;
    default:
      break;
  }
};
const App = () => {
  return;
  <ContextReducerProvider
    value={{ foo: "bar", fizz: "buzz" }}
    contextObj={context}
    reducer={reducer}
  >
    <Consumer />
  </ContextReducerProvider>;
};
//

//snippet from Consumer.js
import context from "path/to/context";

...

const { dispatch } = useContext(context);

/*
changes context to
{ fizz: "buzz"} (plus dispatch function) */
dispatch({ type: "remove", payload: ["foo"] });

//
```

## <ins>`useMemoConsumer` API</ins>

### Example Usage

In the following snippet, `Consumer` is unoptimized and will be rerendered every time `fizz` is updated, even though it does not use `fizz`.

```js
import { createContext, useContext } from "react";
import { ContextProvider } from "react-context-helper";

const context = createContext({});

const Consumer = () => {
  const { foo } = useContext(context);
  return <div>{foo}</div>;
};

const App = () => {
  return (
    <ContextProvider contextObj={context} value={{ foo: "bar", fizz: "buzz" }}>
      <Consumer />
    </ContextProvider>
  );
};
```

The follow snippet prevents this rerender with `useMemoConsumer`. The recipe to optimize components is simple:

1. Convert the consuming component to a pure component, meaning it takes the desired context properties as props and will always render the same way when given the same props.

2. Use the hook `useMemoConsumer` to both memoize the consumer and automatically pass it only the props it needs from the context.

```js
import { createContext, useContext } from "react";
import { ContextProvider, useMemoConsumer } from "react-context-helper";

const context = createContext({});

//converted to pure component
const Consumer = ({ foo }) => {
  return <div>{foo}</div>;
};

const App = () => {
  const [MemoizedConsumer, contextProps] = useMemoConsumer(Consumer, context, [
    "foo",
  ]);
  return (
    <ContextProvider contextObj={context} value={{ foo: "bar", fizz: "buzz" }}>
      <MemoizedPureConsumer {...contextProps} />
    </ContextProvider>
  );
};
```

Any non-context props can be added to the new memoized consumer as well:

```js
//converted to pure component
const Consumer = ({ foo, nonContextProp }) => {
  return <div className="nonContextProp">{foo}</div>;
};

const App = () => {
  const [MemoizedConsumer, contextProps] = useMemoConsumer(Consumer, context, [
    "foo",
  ]);
  return (
    <ContextProvider contextObj={context} value={{ foo: "bar", fizz: "buzz" }}>
      <MemoizedPureConsumer {...contextProps} nonContextProp="myClassname" />
    </ContextProvider>
  );
};
```

### Parameters

- `consumer`: `React.Component`  
  The consumer you are optimizing, in pure form.

- `contextObj`: `Context`  
  The React `Context` that the consumer will be consuming.

- `consumedProps`: `Array`  
  The keys of the properties in the context object that the consumer requires. E.g., if the context shape is:

  ```js
  { foo: "bar", fizz: "buzz", bar: "foo" }
  ```

  and the consumer only uses `foo` and `bar`, then `consumedProps` would be `["foo", "bar"]`

### Return value:

- `Array`  
  An array with the optimized consumer at index 0 and the props object containing only the desired context properties at index 1.
