import { useCallback } from "react";
import { enableES5, useImmer } from "immer";
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
    <props.context.Provider
      value={{ ...context, updateContext, removeFromContext }}
    >
      {props.children}
    </props.context.Provider>
  );
};
