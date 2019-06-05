# react-hook-inview

[![npm version](https://img.shields.io/npm/v/react-hook-inview.svg?style=flat-square)](https://npmjs.org/package/react-hook-inview "View this project on npm")

Detect if an element is in the viewport using a [React Hook](https://reactjs.org/docs/hooks-intro.html). Utilizes the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), so check for [compatibility](https://caniuse.com/#feat=intersectionobserver).

## Install

```
npm install react-hook-inview
```

> *Optional:* Install a [polyfill](https://www.npmjs.com/package/intersection-observer) for browsers that don't support `IntersectionObserver` yet (i.e. Safari 12).

## Usage

```js
const [ref, inView] = useInView()
```

Hooks can only be used inside functional components.

```js
import React, { useState, useRef } from 'react'
import { useInView } from 'react-hook-inview'

const Component = () => {

  const [ref, isVisible] = useInView({
    threshold: 1,
  })

  return (
    <div ref={ref}>
      {isVisible
        ? 'Hello World!'
        : ''
      }
    </div>
  )
}
```
## API
The hook returns four variables.
- A `ref`, used to reference a React node.
- A `boolean` when the element is in the viewport.
- The `IntersectionObserver` entry
- The `IntersectionObserver` itself
```js
const [ref, inView, entry, observer] = useInView(options, [state])
```

## Options
These are the default options. `target` is the only one that's required.
```ts
{
  target?: RefObject<Element>,   // *DEPRECATED*
  root?: Element | null,         // Optional, must be a parent of ref element
  rootMargin?: string,           // '0px' or '0px 0px 0px 0px', also accepts '%' unit
  threshold?: number | number[], // 0.5 or [0, 0.5, 1]
  unobserveOnEnter?: boolean,    // Set 'true' to run only once
  onEnter?: (entry?, observer?) => void, // See below
  onLeave?: (entry?, observer?) => void, // See below
}
```
**Note** If you're updating from < version `4.0.0.`, you might have noticed the API changed. The `target` option has been deprecated, but still works the same way.

## Callbacks
`onEnter` and `onLeave` recieve a function that returns an `IntersectionObserverEntry` and the observer itself.

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

**NOTE**: If you supply an array to `threshold`, `onEnter` will be called when the element intersects with the top _and_ bottom of the viewport. `onLeave` will on trigger once the element has left the viewport at the first threshold specified.

### Accessing state in callback
For performance reasons, the hook is only triggered once on mount/unmount. However, this means you can't access updated state in the `onEnter/onLeave` callbacks. An optional second argument will retrigger the hook to mitigate this.

```js
// Some other state
const [state, setState] = useState(false)

const[ref, inView] = useInView({
  onEnter: () => console.log(state),
}, [state]) // <- Will rerender ref and update callback
```

## License
[MIT](https://github.com/bitmap/react-hook-inview/blob/master/LICENSE)
