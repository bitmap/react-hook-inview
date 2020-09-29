import {
  useEffect,
  useState,
  useCallback,
} from 'react'

import useObserver from './useObserver'

interface State {
  inView: boolean
  entry: IntersectionObserverEntry | null
  observer: IntersectionObserver | null
}

type onIntersect = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void
interface Options extends IntersectionObserverInit {
  unobserveOnEnter?: boolean
  target?: React.RefObject<Element | null>
  onEnter?: onIntersect
  onLeave?: onIntersect
}

interface UseInView {
  (
    options?: Options,
    externalState?: React.ComponentState[]
  ): [
    React.Dispatch<React.SetStateAction<Element | null>>,
    State['inView'],
    State['entry'],
    State['observer'],
  ]
}


/**
 * useInView
 * @param options IntersectionObserverInit
 * @param externalState React.ComponentState[]
 */
const useInView: UseInView = (
  options = {},
  externalState = [],
) => {
  const [state, setState] = useState<State>({
    inView: false,
    entry: null,
    observer: null,
  })

  const {
    root,
    rootMargin,
    threshold,
  } = options

  const callback = useCallback<IntersectionObserverCallback>(([entry], observer) => {
    if (!entry || !observer) return

    const {
      onEnter,
      onLeave,
      unobserveOnEnter,
    } = options

    const { isIntersecting, intersectionRatio } = entry
    const { thresholds } = observer

    if (intersectionRatio >= 0) {
      const inThreshold = thresholds.some(t => intersectionRatio >= t)
      const inView = inThreshold && isIntersecting

      setState({
        inView,
        entry,
        observer,
      })

      // unobserveOnEnter
      if (inView && unobserveOnEnter) observer.disconnect()

      // Legacy callbacks
      if (inView) {
        onEnter && onEnter(entry, observer)
      } else {
        onLeave && onLeave(entry, observer)
      }
    }
  }, [root, rootMargin, threshold])

  const setTarget = useObserver(callback, { root, rootMargin, threshold }, externalState)

  // Legacy 'target' option
  const { target } = options

  useEffect(() => {
    if (target?.current) setTarget(target.current)
  }, [target, setTarget])

  return [setTarget, state.inView, state.entry, state.observer]
}

export default useInView
