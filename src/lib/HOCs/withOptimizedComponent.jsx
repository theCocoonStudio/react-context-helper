import { useMemoConsumer } from "../hooks/useMemoConsumer";
import { getDisplayName } from "../utility/utilities";

export const withOptimizedConsumer = (Consumer, ContextObj, propNames) => {
  const OptimizedConsumer = ({ children, ...props }) => {
    const [Memo, contextProps] = useMemoConsumer(
      Consumer,
      ContextObj,
      propNames,
    );

    return (
      <Memo {...contextProps} {...props}>
        {children}
      </Memo>
    );
  };
  OptimizedConsumer.displayName = `WithOptimizedConsumer(${getDisplayName(
    Consumer,
  )})`;
  return OptimizedConsumer;
};
