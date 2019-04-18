import { useEffect } from 'react'

export const useInView = ({
  root,
  rootMargin = '0px',
  threshold = 0,
  target = null,
  onEnter = () => null,
  onLeave = () => null,
  unobserveOnEnter = false,
}) => {
  const callback = ([entry], observer) => {
    if (entry.isIntersecting) {
      onEnter([entry], observer)
      if (unobserveOnEnter) observer.unobserve(target.current)
    } else {
      onLeave([entry], observer)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      root: root && root.current || null,
      rootMargin,
      threshold,
    })

    if (target) observer.observe(target.current)
    return () => observer.unobserve(target.current)
  }, [])
}
