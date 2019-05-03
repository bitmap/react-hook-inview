import { useEffect } from 'react'
import { Options } from './index.d'

export const useInView = ({
  target,
  root = null,
  rootMargin = '0px',
  threshold = 0,
  onEnter = (): void => {},
  onLeave = (): void => {},
  unobserveOnEnter = false,
}: Options): void => {
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
  }, [])
}
