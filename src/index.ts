import { useEffect, RefObject, ComponentState } from 'react'

interface Intersect {
  (entry: IntersectionObserverEntry, observer: IntersectionObserver): void;
}

interface Options extends IntersectionObserverInit {
  target: RefObject<Element>;
  onEnter?: Intersect;
  onLeave?: Intersect;
  unobserveOnEnter?: boolean;
}

export const useInView = ({
  target,
  root = null,
  rootMargin = '0px 0px 0px 0px',
  threshold = 0,
  onEnter = (): void => {},
  onLeave = (): void => {},
  unobserveOnEnter = false,
}: Options, state?: ComponentState[]): void => {
  const callback: IntersectionObserverCallback = ([entry], observer): void => {
    if (entry.isIntersecting) {
      onEnter(entry, observer)
      if (target.current && unobserveOnEnter) observer.unobserve(target.current)
    } else {
      onLeave(entry, observer)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      root,
      rootMargin,
      threshold,
    })

    if (target.current) observer.observe(target.current)
    return () => {
      if (target.current) {
        return observer.unobserve(target.current)
      }
    }
  }, state ? [...state] : [])
}
