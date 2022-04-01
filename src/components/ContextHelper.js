import { useCallback, useContext, memo, useState, useMemo } from "react";
import { enableES5 } from "immer";
import { useImmer } from "use-immer";
import React from "react";
enableES5();

export const ContextProvider = ({ value, contextObj, children }) => {
  const [context, setContext] = useImmer(value);

  const updateContext = useCallback(
    (toMerge) => {
      setContext((draft) => {
        Object.assign(draft, toMerge);
      });
    },
    [setContext],
  );
  const removeFromContext = useCallback(
    (toDelete) => {
      setContext((draft) => {
        toDelete.forEach((key) => {
          delete draft[key];
        });
      });
    },
    [setContext],
  );

  //prevents a rerender in consumers every time the Provider's parent rerenders
  const contextValue = useMemo(
    () => ({
      ...context,
      updateContext,
      removeFromContext,
    }),
    [context, updateContext, removeFromContext],
  );
  return (
    <contextObj.Provider value={contextValue}>{children}</contextObj.Provider>
  );
};

export const useMemoConsumer = (
  ChildComponent,
  ContextObj,
  contextPropsKeys,
) => {
  const context = useContext(ContextObj);

  const contextMap = contextPropsKeys
    .filter((key) => Object.prototype.hasOwnProperty.call(context, key))
    .map((key) => [key, context[key]]);

  const contextProps = Object.fromEntries(contextMap);
  const [Memo] = useState(memo(ChildComponent));

  return [Memo, contextProps];
};

//usage:
// const [MemoizedChildComponent, contextProps] = useContext(...)

//return <MemoizedChildComponent {...contextProps} {..any other props}><ChildComponent/></MemoizedChildComponent>

//write cli that takes a component and determines if it's better to use React.memo or not

//context objects will be exported using a named export in the same file the ContextProvider is used:

//App.js
/*
import ContextProvider from 'react-context-helper';

export const Context = React.createContext();

export default function App() {
  const initialValue = {
    foo: bar,
    fizz: buzz,
  };
  return (
    <ContextProvider value={initialValue} contextObj={Context}>
      <User />
    </ContextProvider>
  )
}
*/

//Consumer.js
/*
import { useMemoizedChild } from "react-context-helper";
import Context from "/path/to/App.js";
import ChildComponent from "/path/to/ChildComponent.js";

export default function Consumer = () => {
const [MemoizedChildComponent, contextProps] = 
  useMemoConsumer(ChildComponent, Context, ["foo"]);

return 
  <MemoizedChildComponent {...contextProps} {..any other props}/> 
}
*/

//TO DO :

//test context imports
