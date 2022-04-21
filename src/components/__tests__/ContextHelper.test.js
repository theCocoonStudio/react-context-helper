import {
  ContextProvider,
  useMemoConsumer,
  ContextReducerProvider,
} from "../ContextHelper";
import { createContext, useContext, useState, useCallback } from "react";
import { mount } from "enzyme";
import React from "react";
import { Profiler } from "react/cjs/react.production.min";

const LightComponentPure = ({ propTwo, fibNum, nonContextProp }) => {
  return (
    <>
      <div id={nonContextProp}>{fibNum}</div>
      <div id="test">{propTwo || "nothing"}</div>
    </>
  );
};
//slow fibonacci implementation
function fib(x) {
  if (x <= 0) return 0;
  if (x == 1) return 1;
  return fib(x - 1) + fib(x - 2);
}

test("ContextProvider: context is accessible with class components", () => {
  const contextObj = createContext({});

  class Child extends React.Component {
    render() {
      return <div></div>;
    }
  }
  Child.contextType = contextObj;
  const wrapper = mount(<Child />, {
    wrappingComponent: ContextProvider,
    wrappingComponentProps: {
      contextObj: contextObj,
      value: { message: "pass" },
    },
  });

  expect(wrapper.context().message).toBe("pass");
});

test("ContextProvider: context is accessible with function components", () => {
  const contextObj = createContext({});
  const Child = () => {
    const testContext = useContext(contextObj);
    return <div>{testContext.message}</div>;
  };
  const wrapper = mount(<Child />, {
    wrappingComponent: ContextProvider,
    wrappingComponentProps: {
      contextObj: contextObj,
      value: { message: "pass" },
    },
  });

  expect(wrapper.text()).toBe("pass");
});

test("ContextProvider: context-changing functions working", () => {
  const contextObj = createContext({});
  const Child = () => {
    const context = useContext(contextObj);
    const { updateContext, removeFromContext, message, toRemain } = context;
    return (
      <>
        <div
          id="update"
          onClick={() => {
            updateContext({ message: "post" });
          }}
        >
          {"message" in context ? message : "deleted"}
        </div>
        <div
          id="remove"
          onClick={() => {
            removeFromContext(["message"]);
          }}
        />
        <div id="remain">{toRemain}</div>
      </>
    );
  };
  const wrapper = mount(<Child />, {
    wrappingComponent: ContextProvider,
    wrappingComponentProps: {
      contextObj: contextObj,
      value: { message: "pre", toRemain: "on" },
    },
  });
  expect(wrapper.find("#update").text()).toBe("pre");
  expect(wrapper.find("#remain").text()).toBe("on");
  wrapper.find("#update").simulate("click");
  expect(wrapper.find("#update").text()).toBe("post");
  expect(wrapper.find("#remain").text()).toBe("on");
  wrapper.find("#remove").simulate("click");
  expect(wrapper.find("#update").text()).toBe("deleted");
  expect(wrapper.find("#remain").text()).toBe("on");
});

test("ContextProvider: context-changing reducer working", () => {
  const contextObj = createContext({});
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
  const Child = () => {
    const context = useContext(contextObj);
    const { dispatch, message, toRemain } = context;
    return (
      <>
        <div
          id="update"
          onClick={() => {
            dispatch({ type: "update", payload: { message: "post" } });
          }}
        >
          {"message" in context ? message : "deleted"}
        </div>
        <div
          id="remove"
          onClick={() => {
            dispatch({ type: "remove", payload: ["message"] });
          }}
        />
        <div id="remain">{toRemain}</div>
      </>
    );
  };
  const wrapper = mount(<Child />, {
    wrappingComponent: ContextReducerProvider,
    wrappingComponentProps: {
      contextObj: contextObj,
      value: { message: "pre", toRemain: "on" },
      reducer: reducer,
    },
  });
  expect(wrapper.find("#update").text()).toBe("pre");
  expect(wrapper.find("#remain").text()).toBe("on");
  wrapper.find("#update").simulate("click");
  expect(wrapper.find("#update").text()).toBe("post");
  expect(wrapper.find("#remain").text()).toBe("on");
  wrapper.find("#remove").simulate("click");
  expect(wrapper.find("#update").text()).toBe("deleted");
  expect(wrapper.find("#remain").text()).toBe("on");
});

describe("testing useMemoConsumer hook", () => {
  let ContextObj;
  beforeEach(() => (ContextObj = createContext({})));
  test("useMemoConsumer provides only desired context as well as other props", () => {
    const Child = () => {
      const [MemoizedConsumer, contextProps] = useMemoConsumer(
        LightComponentPure,
        ContextObj,
        ["fibNum"],
      );
      return <MemoizedConsumer {...contextProps} nonContextProp="someString" />;
    };
    const wrapper = mount(<Child />, {
      wrappingComponent: ContextProvider,
      wrappingComponentProps: {
        contextObj: ContextObj,
        value: { propOne: "foo", propTwo: "bar", fibNum: "20" },
      },
    });
    expect(wrapper.find("#someString").text()).toBe("20");
    expect(wrapper.find("#test").text()).toBe("nothing");
  });
  test("MemoizedConsumer updates on prop changes", () => {
    const Child = () => {
      const [otherProp, setOtherProp] = useState("ab");
      const [MemoizedConsumer, contextProps] = useMemoConsumer(
        LightComponentPure,
        ContextObj,
        ["fibNum"],
      );
      const update = useCallback(() => {
        setOtherProp((prev) => prev + "ab");
      }, [setOtherProp]);
      return (
        <div id="click" onClick={() => update()}>
          <MemoizedConsumer {...contextProps} nonContextProp={otherProp} />
        </div>
      );
    };
    const wrapper = mount(<Child />, {
      wrappingComponent: ContextProvider,
      wrappingComponentProps: {
        contextObj: ContextObj,
        value: { propOne: "foo", propTwo: "bar", fibNum: "20" },
      },
    });
    wrapper.update();
    expect(wrapper.find("#ab").text()).toBe("20");
    wrapper.find("#click").simulate("click");
    expect(wrapper.find("#abab").text()).toBe("20");
    expect(wrapper.find("#test").text()).toBe("nothing");
  });
  test("MemoizedConsumer updates when connected context is changed", () => {
    const Child = () => {
      const [MemoizedConsumer, contextProps] = useMemoConsumer(
        LightComponentPure,
        ContextObj,
        ["fibNum"],
      );
      const context = useContext(ContextObj);
      const update = () => {
        context.updateContext({ fibNum: "40" });
      };
      return (
        <div id="click" onClick={() => update()}>
          <MemoizedConsumer {...contextProps} nonContextProp={"someString"} />
        </div>
      );
    };
    const wrapper = mount(<Child />, {
      wrappingComponent: ContextProvider,
      wrappingComponentProps: {
        contextObj: ContextObj,
        value: { propOne: "foo", propTwo: "bar", fibNum: "20" },
      },
    });
    wrapper.update();
    expect(wrapper.find("#someString").text()).toBe("20");
    wrapper.find("#click").simulate("click");
    expect(wrapper.find("#someString").text()).toBe("40");
    expect(wrapper.find("#test").text()).toBe("nothing");
  });
  test("MemoizedConsumer doesn't update when unconnected context is changed, but regular consumer does render", () => {
    let timesRendered = 0;
    let timesRendered2 = 0;

    const HeavyComponent = ({ contextObj }) => {
      timesRendered2 += 1;
      const { fibNum } = useContext(contextObj);
      const answer = fib(fibNum);
      return (
        <>
          <div id="test">{fibNum}</div>
          <div id="test2">{answer}</div>
        </>
      );
    };
    const HeavyComponentPure = ({ fibNum, nonContextProp }) => {
      timesRendered += 1;
      const answer = fib(fibNum);
      return (
        <>
          <div id={nonContextProp}>{fibNum}</div>
          <div id="test">{answer}</div>
        </>
      );
    };

    const Child = () => {
      const [MemoizedConsumer, contextProps] = useMemoConsumer(
        HeavyComponentPure,
        ContextObj,
        ["fibNum"],
      );

      const context = useContext(ContextObj);
      const update = () => {
        context.updateContext({
          propOne: context.propOne + "foo",
          propTwo: context.propOne + "bar",
        });
      };
      return (
        <div id="click" onClick={() => update()}>
          <MemoizedConsumer {...contextProps} nonContextProp={"someString"} />
        </div>
      );
    };

    const Child2 = () => {
      const context = useContext(ContextObj);
      const update = () => {
        context.updateContext({
          propOne: context.propOne + "foo",
          propTwo: context.propOne + "bar",
        });
      };
      return (
        <div id="click" onClick={() => update()}>
          <HeavyComponent contextObj={ContextObj} />
        </div>
      );
    };

    const wrapper = mount(<Child />, {
      wrappingComponent: ContextProvider,
      wrappingComponentProps: {
        contextObj: ContextObj,
        value: { propOne: "foo", propTwo: "bar", fibNum: "20" },
      },
    });
    const wrapper2 = mount(<Child2 />, {
      wrappingComponent: ContextProvider,
      wrappingComponentProps: {
        contextObj: ContextObj,
        value: { propOne: "foo", propTwo: "bar", fibNum: "20" },
      },
    });
    wrapper.update();
    expect(wrapper.find("#someString").text()).toBe("20");
    wrapper.find("#click").simulate("click");
    expect(wrapper.find("#someString").text()).toBe("20");
    expect(timesRendered).toBe(1);
    wrapper2.update();
    expect(wrapper2.find("#test").text()).toBe("20");
    wrapper2.find("#click").simulate("click");
    expect(wrapper2.find("#test").text()).toBe("20");
    expect(timesRendered2).toBe(2);
  });
});

test("ensure using useMemoConsumer hook saves computation time", () => {
  const ContextObj = createContext({});
  const times = [0, 0, 0, 0];
  const HeavyComponent = () => {
    const { fibNum } = useContext(ContextObj);
    const answer = fib(fibNum);
    return <div>{answer}</div>;
  };

  const HeavyComponentPure = ({ fibNum }) => {
    const answer = fib(fibNum);
    return <div>{answer}</div>;
  };

  const LightComponent = () => {
    const { fibNum } = useContext(ContextObj);
    return <div>{fibNum}</div>;
  };

  const LightComponentPure = ({ fibNum }) => {
    return <div>{fibNum}</div>;
  };

  const Child = ({ Component }) => {
    const context = useContext(ContextObj);
    const update = () => {
      context.updateContext({
        propOne: context.propOne + 1,
      });
    };
    return (
      <div id="click" onClick={() => update()}>
        <Component />
      </div>
    );
  };
  const PureChild = ({ Component }) => {
    const [MemoizedConsumer, contextProps] = useMemoConsumer(
      Component,
      ContextObj,
      ["fibNum"],
    );
    const context = useContext(ContextObj);
    const update = () => {
      context.updateContext({
        propOne: context.propOne + 1,
      });
    };
    return (
      <div id="click" onClick={() => update()}>
        <MemoizedConsumer {...contextProps} />
      </div>
    );
  };

  const ProfilerWrapper = ({ Child, Component, componentIndex, id }) => {
    const callback = (
      id, // the "id" prop of the Profiler tree that has just committed
      phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
      actualDuration, // time spent rendering the committed update
      baseDuration, // estimated time to render the entire subtree without memoization
      startTime, // when React began rendering this update
      commitTime, // when React committed this update
      interactions, // the Set of interactions belonging to this update
    ) => {
      times[componentIndex] = times[componentIndex] + actualDuration;
    };
    return (
      <Profiler id={id} onRender={callback}>
        <Child Component={Component} />
      </Profiler>
    );
  };

  const wrapper = mount(
    <ProfilerWrapper
      Child={Child}
      Component={LightComponent}
      componentIndex={0}
      id="LightComponent"
    />,
    {
      wrappingComponent: ContextProvider,
      wrappingComponentProps: {
        contextObj: ContextObj,
        value: { propOne: 0, fibNum: "20" },
      },
    },
  );
  const wrapper2 = mount(
    <ProfilerWrapper
      Child={PureChild}
      Component={LightComponentPure}
      componentIndex={1}
      id="LightComponentPure"
    />,
    {
      wrappingComponent: ContextProvider,
      wrappingComponentProps: {
        contextObj: ContextObj,
        value: { propOne: 0, fibNum: "20" },
      },
    },
  );
  const wrapper3 = mount(
    <ProfilerWrapper
      Child={Child}
      Component={HeavyComponent}
      componentIndex={2}
      id="HeavyComponent"
    />,
    {
      wrappingComponent: ContextProvider,
      wrappingComponentProps: {
        contextObj: ContextObj,
        value: { propOne: 0, fibNum: "20" },
      },
    },
  );
  const wrapper4 = mount(
    <ProfilerWrapper
      Child={PureChild}
      Component={HeavyComponentPure}
      componentIndex={3}
      id="HeavyComponentPure"
    />,
    {
      wrappingComponent: ContextProvider,
      wrappingComponentProps: {
        contextObj: ContextObj,
        value: { propOne: 0, fibNum: "20" },
      },
    },
  );
  wrapper.update();
  wrapper2.update();
  wrapper3.update();
  wrapper4.update();

  for (let i = 0; i < 10; i++) {
    wrapper.find("#click").simulate("click");
    wrapper2.find("#click").simulate("click");
    wrapper3.find("#click").simulate("click");
    wrapper4.find("#click").simulate("click");
  }
  console.log(
    "Each component undergoes initial render and then a context property that it is not using is updated 1000 times:",
  );
  console.log("LightComponent total rendering time: " + times[0] + "s");
  console.log("LightComponentPure total rendering time: " + times[1] + "s");
  console.log("HeavyComponent total rendering time: " + times[2] + "s");
  console.log("HeavyComponentPure total rendering time: " + times[3] + "s");

  expect(times[3]).toBeLessThan(times[2]);
});
