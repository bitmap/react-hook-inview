import {
  useRef,
  useCallback,
} from 'react'

interface UseObserver {
  (
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
    externalState?: React.ComponentState[]
  ): (node: Element | null) => void
}

/**
 * useObserver
 * @param callback IntersectionObserverCallback
 * @param options IntersectionObserverInit
 * @param externalState React.ComponentState[]
 */
const useObserver: UseObserver = (
  callback,
  options,
  externalState,
) => {

  const target = useRef<Element | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)
  const { root, rootMargin, threshold } = options || {}
  const dependencies = externalState || []

  const setTarget = useCallback(node => {
    if (target.current && observer.current) {
      observer.current.unobserve(target.current)
      observer.current.disconnect()
      observer.current = null
    }

    if (node) {
      observer.current = new IntersectionObserver(callback, { root, rootMargin, threshold })
      observer.current.observe(node)
      target.current = node
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, root, rootMargin, threshold, ...dependencies])

  return setTarget
}

export default useObserver
