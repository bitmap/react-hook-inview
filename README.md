# react-hook-inview

[![npm version](https://img.shields.io/npm/v/react-hook-inview.svg?style=flat-square)](https://npmjs.org/package/react-hook-inview 'View this project on npm')

Detect if an element is in the viewport using a [React
Hook](https://reactjs.org/docs/hooks-intro.html). Utilizes the [Intersection
Observer API], so check for
[compatibility](https://caniuse.com/#feat=intersectionobserver).

# Install

```
npm install react-hook-inview
```

> _Optional:_ Install a
> [polyfill](https://www.npmjs.com/package/intersection-observer) for browsers
> that don't support `IntersectionObserver` yet (i.e. Safari 12).

# `useInView`

The hook in its most basic form returns a ref and a boolean.

```js
const [ref, inView] = useInView()
```

That's all you need to get started, but it does [a lot more](#api).

## Example

In this example, the boolean is used to toggle some text on and off when the
element is fully in the viewport.

```js
import React from 'react'
import { useInView } from 'react-hook-inview'

const Component = () => {
  const [ref, isVisible] = useInView({
    threshold: 1,
  })

  return <div ref={ref}>{isVisible ? 'Hello World!' : ''}</div>
}
```

## API

The hook returns a tuple with four items:

- A `ref` callback, used to set observer on an element.
- A `boolean` when the element is in the viewport.
- The `IntersectionObserverEntry`
- The `IntersectionObserver` itself

```js
const [ref, inView, entry, observer] = useInView(options, [...state])
```

## Options

These are the default options.

```ts
{
  root?: RefObject<Element> | null, // Optional, must be a parent of your ref
  rootMargin?: string,              // '0px' or '0px 0px 0px 0px', also accepts '%' unit
  threshold?: number | number[],    // 0.5 or [0, 0.5, 1]
  unobserveOnEnter?: boolean,       // Set 'true' to run only once
  onEnter?: (entry?, observer?) => void, // See below
  onLeave?: (entry?, observer?) => void, // See below
  target?: RefObject<Element> | null,    // *DEPRECATED* Supply your own ref object
  defaultInView?: boolean, // false
}
```

**NOTE** If you're updating from < version `4.0.0.`, you might have noticed an
API changed. The `target` option has been deprecated, but still works the same
way.

## `onEnter` & `onLeave` callbacks

:warning: These options are deprecated, and support may be removed in a future
release. To access the intersection observer callback, use the
[useInViewEffect](#useInViewEffect) hook instead.

`onEnter` and `onLeave` recieve a callback function that returns an
`IntersectionObserverEntry` and the `IntersectionObserver` itself. The two
arguments are entirely optional.

```js
function onEnter(entry, observer) {
  // entry.boundingClientRect
  // entry.intersectionRatio
  // entry.intersectionRect
  // entry.isIntersecting
  // entry.rootBounds
  // entry.target
  // entry.time
}
```

**NOTE**: If you supply an array with multiple values to `threshold`, `onEnter`
will be called each time the element intersects with the top _and_ bottom of
the viewport. `onLeave` will on trigger once the element has left the viewport
at the first threshold specified.

### Accessing external state in callbacks

For performance reasons, the hook is only triggered once on mount. However,
this means you can't access updated state in the `onEnter/onLeave` callbacks.
An optional second argument will retrigger the hook to mitigate this.

```js
// Some other state
const [state, setState] = useState(false)

const [ref, inView] = useInView(
  {
    onEnter: () => console.log(state),
  },
  [state], // <- Will update callback
)
```

This will remount the intersection observer, and may have unintended side
effects. Use this feature with caution.

# `useInViewEffect`

An alternate hook that allows you to just supply the intersection observer
callback. This approach is gives you a little more flexibilty than using the
callbacks in the original hook as it doesn't obfuscate the [Intersection
Observer API] as much.

```js
const ref = useInViewEffect(callback, options, [...state])
```

## Example

```js
import React, { useState } from 'react'
import { useInViewEffect } from 'react-hook-inview'

const Component = () => {
  const [isVisible, setIsVisible] = useState(false)

  const ref = useInViewEffect(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target)
      }
      setIsVisible(entry.isIntersecting)
    },
    { threshold: 0.5 },
  )

  return <div ref={ref}>{isVisible ? 'Hello World!' : ''}</div>
}
```

Keep in mind that the first argument will return an array.

## Options

The `useInViewEffect` hook has more limited options that mirror the default
API.

```js
{
  root?: RefObject<Element> | null, // Optional, must be a parent of your ref
  rootMargin?: string,              // '0px' or '0px 0px 0px 0px', also accepts '%' unit
  threshold?: number | number[],    // 0.5 or [0, 0.5, 1]
}
```

# License

[MIT](https://github.com/bitmap/react-hook-inview/blob/master/LICENSE)

[intersection observer api]: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
