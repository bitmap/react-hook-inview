// This is experimental and not compiled

import { useEffect } from 'react'
import { Options } from './index.d'

export const useInView = ({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  target = null,
  onEnter = (): void => null,
  onLeave = (): void => null,
  unobserveOnEnter = false,
}: Options): void => {
  const callback: IntersectionObserverCallback = ([entry], observer): void => {
    if (entry.isIntersecting) {
      onEnter([entry], observer)
      if (unobserveOnEnter) observer.unobserve(target.current)
    } else {
      onLeave([entry], observer)
    }
  }

  useEffect((): () => void => {
    const observer = new IntersectionObserver(callback, {
      root,
      rootMargin,
      threshold,
    })

    if (target) observer.observe(target.current)
    return (): void => observer.unobserve(target.current)
  }, [])
}
