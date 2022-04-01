import {createContext, useContext} from "react";
import {useMemoConsumer, ContextProvider} from "react-context-helper";

////////////typical context pattern
const contextObj = createContext({});
const initialValue = {foo: "bar", fizz: "buzz"}; //Problem 1: no standard way to update this context
const App = () => {
  return (
  <contextObj.Provider value={initialValue}>  
    <Consumer/>
  </contextObj.Provider>)
} 

const Consumer = () => { 
  const context = useContext(contextObj);
  <div>{context.foo}</div> //Problem 2: component only uses context.foo but still rerenders when only context.fizz is updated. If it's a heavy component, it will slow down the app.
}
////////////////////

///////////////Solution to problem 1
const contextObj2 = createContext({});
const initialValue2 = {foo: "bar", fizz: "buzz"};
  
const App2 = () => {
  return (
  <ContextProvider value={initialValue2} contextObj={contextObj2}>  
    <Consumer2/>
  </ContextProvider>)
  //if using ContextProvider, you automatically get two functions in the context: updateContext(<object to merge into context>) and removeFromContext(<string array containing names of properties to remove>);
  //this allows you to easily update the context:
} 

const Consumer2 = () => {
  const context = useContext(contextObj2); //initially {foo: "bar", fizz: "buzz", removeFromContext: function, updateContext: function}
  context.updateContext({fizz: "bizz", bar: "foo"}); //merges this object with current context object, overriding any existing properties
  //context is now {foo: "bar", fizz: "bizz", bar: "foo", removeFromContext: function, updateContext: function}
  context.removeFromContext(["foo", "fizz"]);//removes these properties
  //context is now {bar: "foo", removeFromContext: function, updateContext: function}
  return <div>{context.bar}</div> 
}
//////////////////

/////////////Solution to problem 2
const contextObj3 = createContext({});
const initialValue3 = {foo: "bar", fizz: "buzz"};
  
//you can use ContextProvider too here, but you don't have to. ContextProvider and useMemoComponent can be used separately
const App3 = () => {
  const [MemoizedChildComponent, contextProp] = useMemoConsumer(Consumer3, contextObj3, ["foo"]); //you get a memoized version of the consumer and also an object containing only the context properties that the consumer uses. This in a regular object.
  //so here, contextProps = {foo: "bar"} -- it doesn't include fizz: "buzz" as the consumer does't use that property.
  return <contextObj.Provider>
          <MemoizedChildComponent ...contextProps nonContextProp={"example"}/>
        </contextObj.Provider> //you can add non-context props, too
} 

  //the consumer is refactored to only use props instead of context. It is a pure component, meaning we know it only updates when its props change

  const Consumer3 = ({foo, nonContextProp}) => {
    return <div id={nonContextProp}>{foo}</div>//added a nonContextProp to show it's possible to use 
  }

  //now, this consumer only renders when context.foo changes. No other context changes make it rerender. Optimization complete!

  //NOTE: only use useMemoComponent on heavy components. The overhead to set up the memo outweighs this optimization in small components.
////////////////////
