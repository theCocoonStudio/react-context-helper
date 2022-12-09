import { useCallback, useMemo } from "react";
import { enableES5 } from "immer";
import { useImmer } from "use-immer";
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

export default { ContextProvider };
