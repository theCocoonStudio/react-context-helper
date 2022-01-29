import { useCallback, useEffect } from "react";
import { enableES5 } from "immer";
import { useImmer } from "use-immer";
import React from "react";
enableES5();

export const ContextProvider = (props) => {
  const [context, setContext] = useImmer(props.value);

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
  const [contextObj, setContextObj] = React.useState({
    ...context,
    updateContext,
    removeFromContext,
  });
  useEffect(() => {
    setContextObj({ ...context, updateContext, removeFromContext });
  }, [context, updateContext, removeFromContext]);
  return (
    <props.contextObj.Provider value={contextObj}>
      {props.children}
    </props.contextObj.Provider>
  );
};
