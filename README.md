# react-hook-inview

[![npm version](https://img.shields.io/npm/v/react-hook-inview.svg?style=flat-square)](https://npmjs.org/package/react-hook-inview 'View this project on npm')

Detect if an element is in the viewport using a [React Hook](https://reactjs.org/docs/hooks-intro.html). Utilizes the [Intersection Observer API], so check for [compatibility](https://caniuse.com/#feat=intersectionobserver).

## Browser Support

The Intersection Observer API is supported in all modern browsers:

- Chrome 51+
- Firefox 55+
- Safari 12.1+
- Edge 15+

For older browsers (such as IE11), consider using a [polyfill](https://www.npmjs.com/package/intersection-observer).

## Install

```
npm install react-hook-inview
```

## `useInView`

The hook in its most basic form returns a ref and a boolean.

```js
const [ref, inView] = useInView()
```

That's all you need to get started, but it does [a lot more](#api).

### Basic Example

In this example, the boolean is used to toggle some text on and off when the element is fully in the viewport.

```jsx
import React from 'react'
import { useInView } from 'react-hook-inview'

const Component = () => {
  const [ref, isVisible] = useInView({
    threshold: 1,
  })

  return <div ref={ref}>{isVisible ? 'Hello World!' : ''}</div>
}
```

### TypeScript Example

The hook works seamlessly with TypeScript:

```tsx
import React from 'react'
import { useInView, UseInViewOptions } from 'react-hook-inview'

const Component: React.FC = () => {
  const options: UseInViewOptions = {
    threshold: 0.5,
    unobserveOnEnter: true,
  }

  const [ref, inView, entry, observer] = useInView(options)

  return (
    <div ref={ref}>
      {inView && <p>Element is visible!</p>}
      {entry && <p>Intersection ratio: {entry.intersectionRatio}</p>}
    </div>
  )
}
```

### API

The hook returns a tuple with four items:

- A `ref` callback, used to set observer on an element.
- A `boolean` when the element is in the viewport.
- The `IntersectionObserverEntry`
- The `IntersectionObserver` itself

```js
const [ref, inView, entry, observer] = useInView(options, [...state])
```

### Options

These are the default options.

```ts
interface UseInViewOptions {
  root?: Element | Document | null    // Optional, must be a parent of your ref
  rootMargin?: string                 // '0px' or '0px 0px 0px 0px', also accepts '%' unit
  threshold?: number | number[]       // 0.5 or [0, 0.5, 1]
  unobserveOnEnter?: boolean          // Set 'true' to run only once
  defaultInView?: boolean             // false
  onEnter?: (entry, observer) => void // @deprecated - use useInViewEffect
  onLeave?: (entry, observer) => void // @deprecated - use useInViewEffect
  target?: RefObject<Element>         // @deprecated - use ref callback
}
```

### Accessing external state in callbacks

For performance reasons, the hook is only triggered once on mount. However, this means you can't access updated state in the `onEnter/onLeave` callbacks. An optional second argument will retrigger the hook to mitigate this.

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

This will remount the intersection observer, and may have unintended side effects. Use this feature with caution.

## `useInViewEffect`

An alternate hook that allows you to supply the intersection observer callback directly. This approach gives you more flexibility as it doesn't abstract away the [Intersection Observer API] as much.

```js
const ref = useInViewEffect(callback, options, [...state])
```

### Basic Example

```jsx
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

### TypeScript Example

```tsx
import React, { useState } from 'react'
import { useInViewEffect } from 'react-hook-inview'

const Component: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  const ref = useInViewEffect(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        observer.unobserve(entry.target)
      }
      setIsVisible(entry.isIntersecting)
    },
    { threshold: 0.5 },
  )

  return <div ref={ref}>{isVisible ? 'Visible!' : 'Not visible'}</div>
}
```

Keep in mind that the first argument will return an array.

### Options

The `useInViewEffect` hook has more limited options that mirror the default API.

```ts
{
  root?: Element | Document | null // Optional, must be a parent of your ref
  rootMargin?: string              // '0px' or '0px 0px 0px 0px', also accepts '%' unit
  threshold?: number | number[]    // 0.5 or [0, 0.5, 1]
}
```

## Migration Guide

### Migrating from v3.x to v4.x

#### Deprecated: `target` option

The `target` option has been deprecated in favor of using the ref callback directly:

```jsx
// Before (v3.x)
const ref = useRef(null)
useInView({ target: ref })

// After (v4.x)
const [ref, inView] = useInView()
return <div ref={ref}>...</div>
```

#### Deprecated: `onEnter` and `onLeave` callbacks

These callbacks are deprecated. Use `useInViewEffect` instead for more control:

```jsx
// Before (v3.x)
const [ref] = useInView({
  onEnter: (entry) => console.log('Entered!', entry),
  onLeave: (entry) => console.log('Left!', entry),
})

// After (v4.x)
const ref = useInViewEffect(([entry], observer) => {
  if (entry.isIntersecting) {
    console.log('Entered!', entry)
  } else {
    console.log('Left!', entry)
  }
})
```

## License

[MIT](https://github.com/bitmap/react-hook-inview/blob/master/LICENSE)

[intersection observer api]: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
