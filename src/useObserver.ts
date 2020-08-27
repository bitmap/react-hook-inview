import {
  useRef,
  useCallback,
} from 'react'

interface UseObserver {
  (
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
    externalState?: React.ComponentState[]
  ): React.Dispatch<React.SetStateAction<Element | null>>
}

/**
 * useObserver
 * @param callback IntersectionObserverCallback
 * @param options IntersectionObserverInit
 * @param externalState React.ComponentState[]
 */
const useObserver: UseObserver = (
  callback,
  options = {},
  externalState = [],
) => {
  const target = useRef<Element | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  const setTarget = useCallback(node => {
    const {
      root = null,
      rootMargin = '0px 0px 0px 0px',
      threshold = 0,
    } = options
    if (target.current) observer.current?.unobserve(target.current)

    if (!node) return

    observer.current = new IntersectionObserver(callback, { root, rootMargin, threshold })
    observer.current.observe(node)
    target.current = node

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, ...externalState])

  return setTarget
}

export default useObserver
