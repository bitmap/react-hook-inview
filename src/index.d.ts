import { RefObject } from 'react'

declare module 'react-hook-inview'

type Entry = IntersectionObserverEntry[];
type Observer = IntersectionObserver;

export interface Options extends IntersectionObserverInit {
  target: RefObject<HTMLElement>;
  onEnter?: (enrty: Entry, observer: Observer) => void;
  onLeave?: (enrty: Entry, observer: Observer) => void;
  unobserveOnEnter?: boolean;
}

declare function useInView(options: Options): void
