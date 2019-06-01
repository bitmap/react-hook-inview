import {
  useEffect,
  useState,
  useRef,
  RefObject,
  Dispatch,
  SetStateAction,
  ComponentState,
} from 'react'

interface Intersect {
  (entry: IntersectionObserverEntry, observer: IntersectionObserver): void;
}

interface Options extends IntersectionObserverInit {
  target?: RefObject<Element | null>;
  onEnter?: Intersect;
  onLeave?: Intersect;
  unobserveOnEnter?: boolean;
}

interface State {
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

type ExternalState = ComponentState[]

type Hook = [
  Dispatch<SetStateAction<Element | null>>,
  State['isIntersecting'],
  State['entry'],
  IntersectionObserver | null,
]

export const useInView = (
  options?: Options,
  externalState: ExternalState = []
): Hook => {
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

  const Observer = useRef<IntersectionObserver | null>(null)
  const [ref, setRef] = useState<Element | null>(null)
  const [state, setState] = useState<State>({
    isIntersecting: false,
    entry: null,
  })

  const callback: IntersectionObserverCallback = ([entry], observer): void => {
    if (!ref || !entry || !observer) return

    const { isIntersecting } = entry

    setState({
      isIntersecting,
      entry,
    })

    if (isIntersecting) {
      onEnter && onEnter(entry, observer)
      if (unobserveOnEnter) observer.unobserve(ref)
    } else {
      onLeave && onLeave(entry, observer)
    }
  }

  useEffect(() => {
    if (!target) return
    setRef(target.current)
  }, [target])

  useEffect(() => {
    if (!ref) return
    if (Observer.current) Observer.current.unobserve(ref)

    Observer.current = new IntersectionObserver(callback, {
      root,
      rootMargin,
      threshold,
    })

    const { current: currentObserver } = Observer

    currentObserver.observe(ref)

    return () => currentObserver.unobserve(ref)
  }, [ref, ...externalState])

  return [setRef, state.isIntersecting, state.entry, Observer.current]
}
