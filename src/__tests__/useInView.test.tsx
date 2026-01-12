import React, { useState, useRef, useEffect } from "react";
import { describe, test, expect } from "vitest";
import { render, renderHook, act } from "@testing-library/react";
import { useInView } from "..";

import { mockIntersectionObserver } from "jsdom-testing-mocks";
const io = mockIntersectionObserver();

describe("useInView", () => {
  test("sets ref", async () => {
    const { result } = renderHook(() => useInView());
    let [setRef, inView, entry] = result.current;

    const element = document.createElement("div");

    act(() => {
      setRef(element);
      io.triggerNodes([element]);
    });

    [setRef, inView, entry] = result.current;
    expect(entry?.target).toBe(element);
    expect(inView).toBe(false);
  });

  test("sets inview", async () => {
    const { result } = renderHook(() => useInView());
    let [setRef, inView, entry] = result.current;

    const element = document.createElement("div");

    act(() => {
      setRef(element);
      io.enterNode(element);
    });

    [setRef, inView, entry] = result.current;
    expect(entry?.target).toBe(element);
    expect(inView).toBe(true);
  });

  test("toggles inview", async () => {
    const { result } = renderHook(() => useInView());
    let [setRef, inView] = result.current;

    const element = document.createElement("div");

    act(() => {
      setRef(element);
      io.enterNode(element);
    });

    [setRef, inView] = result.current;
    expect(inView).toBe(true);

    act(() => {
      io.leaveNode(element);
    });

    [setRef, inView] = result.current;
    expect(inView).toBe(false);
  });

  test("unobserves on enter", async () => {
    const { result } = renderHook(() => useInView({ unobserveOnEnter: true }));
    let [setRef, inView] = result.current;

    const element = document.createElement("div");

    act(() => {
      setRef(element);
      io.enterNode(element);
    });

    [setRef, inView] = result.current;
    expect(inView).toBe(true);

    act(() => {
      io.enterNode(element);
    });

    [setRef, inView] = result.current;
    expect(inView).toBe(true);
  });

  test("sets 'defaultInView' option", async () => {
    const { result } = renderHook(() => useInView({ defaultInView: true }));
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

      return <div ref={ref}>{inView.toString()}</div>;
    };
    const { getByText } = render(<Component />);

    act(() => {
      io.enterNode(getByText("false"));
    });

    expect(getByText("true")).toBeInTheDocument();

    act(() => {
      io.leaveNode(getByText("true"));
    });

    expect(getByText("false")).toBeInTheDocument();
  });

  test("root option", async () => {
    const ComponentWithRoot: React.FC = () => {
      const rootRef = useRef<HTMLDivElement | null>(null);

      const [rootEl, setRootEl] = useState<Element | null>(null);

      useEffect(() => {
        setRootEl(rootRef.current);
      }, []);

      const [ref, , , observer] = useInView({
        root: rootEl,
      });
      const root = observer?.root;
      const text = !!root;

      return (
        <div ref={rootRef}>
          <div ref={ref}>{text.toString()}</div>
        </div>
      );
    };

    const { getByText } = render(<ComponentWithRoot />);

    act(() => {
      io.triggerNodes([getByText("false")]); // Renders 'undefined' here
    });

    expect(getByText("true")).toBeInTheDocument();
  });
});
