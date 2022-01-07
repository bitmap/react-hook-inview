import React, { useState, useRef } from "react";
import { render } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import { useInView } from "..";
import { mockInView } from "../__mocks__/mockInView";

describe("useInView", () => {
  test("sets ref", async () => {
    const { result } = renderHook(() => useInView());
    let [setRef, inView, entry] = result.current;

    const element = document.createElement("div");

    act(() => {
      setRef(element);
      mockInView(element, false);
    })

    ;[setRef, inView, entry] = result.current;
    expect(entry?.target).toBe(element);
    expect(inView).toBe(false);
  });

  test("sets inview", async () => {
    const { result } = renderHook(() => useInView());
    let [setRef, inView, entry] = result.current;

    const element = document.createElement("div");

    act(() => {
      setRef(element);
      mockInView(element, true);
    })

    ;[setRef, inView, entry] = result.current;
    expect(entry?.target).toBe(element);
    expect(inView).toBe(true);
  });

  test("toggles inview", async () => {
    const { result } = renderHook(() => useInView());
    let [setRef, inView] = result.current;

    const element = document.createElement("div");

    act(() => {
      setRef(element);
      mockInView(element, true);
    })

    ;[setRef, inView] = result.current;
    expect(inView).toBe(true);

    act(() => {
      mockInView(element, false);
    })

    ;[setRef, inView] = result.current;
    expect(inView).toBe(false);
  });

  test("unobserves on enter", async () => {
    const { result } = renderHook(() => useInView({
      unobserveOnEnter: true,
    }));
    let [setRef, inView] = result.current;

    const element = document.createElement("div");

    act(() => {
      setRef(element);
      mockInView(element, true);
    })

    ;[setRef, inView] = result.current;
    expect(inView).toBe(true);

    act(() => {
      mockInView(element, false);
    })

    ;[setRef, inView] = result.current;
    expect(inView).toBe(true);
  });

  test("sets 'defaultInView' option", async () => {
    const { result } = renderHook(() => useInView({
      defaultInView: true,
    }));
    const [setRef, inView] = result.current;

    const element = document.createElement("div");

    act(() => {
      setRef(element);
    });

    expect(inView).toBe(true);
  });

  test("legacy methods", async () => {
    const Component: React.FC = () => {
      const ref = useRef<HTMLDivElement>(null);
      const [inView, setInView] = useState(false);
      useInView({
        target: ref,
        onEnter: () => {
          setInView(true);
        },
        onLeave: () => {
          setInView(false);
        },
      });

      return (
        <div ref={ref}>
          {inView.toString()}
        </div>
      );
    };
    const { getByText } = render(<Component />);

    mockInView(getByText("false"), true);
    mockInView(getByText("true"), false);

    expect(getByText("false")).toBeInTheDocument();
  });


  test("root option", async () => {
    const ComponentWithRoot: React.FC = () => {
      const rootRef = useRef<HTMLDivElement | null>(null);

      const [ref, ,, observer] = useInView({
        root: rootRef.current,
      });
      const root = observer?.root;
      const text = !!root;

      return (
        <div ref={rootRef}>
          <div ref={ref}>
            {text.toString()}
          </div>
        </div>
      );
    };

    const { getByText } = render(<ComponentWithRoot />);

    mockInView(getByText("false"), false); // Renders 'undefined' here
    mockInView(getByText("false"), false); // Renders 'null' here

    expect(getByText("true")).toBeInTheDocument();
  });
});
