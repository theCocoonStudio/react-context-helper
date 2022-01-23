import { useCallback } from "react";
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

  return (
    <props.contextObj.Provider
      value={{ ...context, updateContext, removeFromContext }}
    >
      {props.children}
    </props.contextObj.Provider>
  );
};
