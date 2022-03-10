import { ContextProvider, useMemoConsumer } from "../components/ContextHelper";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  Profiler, //eslint-disable-line
} from "react";
import { mount } from "enzyme";
import React from "react";
import {
  HeavyComponent, //eslint-disable-line
  HeavyComponentPure,//eslint-disable-line
  LightComponent,//eslint-disable-line
  LightComponentPure,
} from "./components/TestComponents";

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

describe("testing useMemoConsumer hook", () => {
  const ContextObj = createContext({});
  test("useMemoConsumer provides context and other props", () => {
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
  });
  test("useMemoConsumer doesn't update when unconnected context is changed", () => {
    const Child = () => {
      const [MemoizedConsumer, contextProps] = useMemoConsumer(
        LightComponentPure,
        ContextObj,
        ["fibNum"],
      );
      console.log("contextProps:");
      console.log(contextProps);
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
    console.log("last test:");
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
    expect(wrapper.find("#someString").text()).toBe("20");
  });
});
