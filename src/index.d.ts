import { RefObject } from 'react'

declare module 'react-hook-inview'

type Entry = IntersectionObserverEntry;
type Observer = IntersectionObserver;

export interface Options extends IntersectionObserverInit {
  target: RefObject<Element>;
  onEnter?: (entry: Entry, observer: Observer) => void;
  onLeave?: (entry: Entry, observer: Observer) => void;
  unobserveOnEnter?: boolean;
}

declare function useInView(options: Options): void
