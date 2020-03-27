import {
  useEffect,
  useState,
  useRef,
  useCallback,
  RefObject,
  Dispatch,
  SetStateAction,
  ComponentState,
} from 'react'

type Ref = Element | null
type SetRef = Dispatch<SetStateAction<Ref>>
type ExternalState = ComponentState[]

interface OnIntersectCallback {
  (entry: IntersectionObserverEntry, observer: IntersectionObserver): void
}

interface UseInViewOptions extends IntersectionObserverInit {
  target?: RefObject<Ref>
  onEnter?: OnIntersectCallback
  onLeave?: OnIntersectCallback
  unobserveOnEnter?: boolean
}

interface UseInViewState {
  inView: boolean
  entry: IntersectionObserverEntry | null
}

type Hook = [
  SetRef,
  UseInViewState['inView'],
  UseInViewState['entry'],
  IntersectionObserver | null,
]

interface UseObserver {(
  ref: Ref,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
  externalState?: ExternalState
): IntersectionObserver | null }

interface UseInViewEffect {(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
  externalState?: ExternalState
): SetRef }

interface UseInView {(
  options?: UseInViewOptions,
  externalState?: ExternalState
): Hook }

const useObserver: UseObserver = (ref, callback, options = {}, externalState = []) => {
  const Observer = useRef<IntersectionObserver | null>(null)
  const onIntersect = useCallback(callback, [ref, ...externalState])

  useEffect(() => {
    if (!ref) return
    if (Observer.current) Observer.current.unobserve(ref)
    Observer.current = new IntersectionObserver(onIntersect, options)

    const { current: currentObserver } = Observer

    currentObserver.observe(ref)
    return () => currentObserver.unobserve(ref)
  }, [ref, ...externalState])

  return Observer.current
}


export const useInViewEffect: UseInViewEffect = (
  callback,
  options = {},
  externalState = [],
) => {
  const [ref, setRef] = useState<Ref>(null)

  useObserver(ref, callback, options, externalState)

  return setRef
}

export const useInView: UseInView = (
  options,
  externalState = [],
) => {
  const { ...ops } = options

  const {
    root = null,
    rootMargin = '0px 0px 0px 0px',
    threshold = 0,
    target,
    onEnter,
    onLeave,
    unobserveOnEnter,
  } = ops

  const [ref, setRef] = useState<Ref>(null)
  const [state, setState] = useState<UseInViewState>({
    inView: false,
    entry: null,
  })

  const callback: IntersectionObserverCallback = ([entry], observer): void => {
    if (!ref || !entry || !observer) return

    const { isIntersecting, intersectionRatio } = entry

    if (intersectionRatio >= 0) {
      const inThreshold = observer.thresholds.some(threshold => intersectionRatio >= threshold)

      const inView = inThreshold && isIntersecting

      setState({
        inView,
        entry,
      })

      if (inView) {
        onEnter && onEnter(entry, observer)
        if (unobserveOnEnter) observer.unobserve(ref)
      } else {
        onLeave && onLeave(entry, observer)
      }
    }
  }

  useEffect(() => {
    if (!target) return
    setRef(target.current)
  }, [target])

  const observer = useObserver(ref, callback, { root, rootMargin, threshold }, externalState)

  return [setRef, state.inView, state.entry, observer]
}
