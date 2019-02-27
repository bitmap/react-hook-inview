import { useLayoutEffect } from 'react'

const useInView = ({
  root,
  rootMargin = '0px',
  threshold = 0,
  target = null,
  onEnter = () => null,
  onLeave = () => null,
  unobserveOnEnter = false,
  polyfill = false
}) => {
  const callback = ([entry], observer) => {
    if (entry.isIntersecting) {
      onEnter([entry], observer)
      if (unobserveOnEnter) observer.unobserve(target.current)
    } else {
      onLeave([entry], observer)
    }
  }

  useLayoutEffect(() => {
    if (polyfill) IntersectionObserverPolyfill()

    const observer = new IntersectionObserver(callback, {
      root: root && root.current || null,
      rootMargin,
      threshold
    })

    if (target) observer.observe(target.current)
    return () => observer.unobserve(target.current)
  }, [])
}

export default useInView

export const useInViewPolyfill = (options) => useInView({ polyfill: true, ...options })

export function IntersectionObserverPolyfill() {
  if (typeof window.IntersectionObserver === 'undefined') {
    window.IntersectionObserverPolyfill = true
    // eslint-disable-next-line
    require('intersection-observer')
  }
}

