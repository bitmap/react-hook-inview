import { RefObject } from 'react'

declare module 'react-hook-inview'

export interface Props {
  target: RefObject<HTMLElement>;
  root?: RefObject<HTMLElement> | null;
  rootMargin?: string;
  threshold?: number | number[];
  onEnter?: (entry?: IntersectionObserverEntry[], observer?: IntersectionObserver) => void;
  onLeave?: (entry?: IntersectionObserverEntry[], observer?: IntersectionObserver) => void;
  unobserveOnEnter?: boolean;
}

declare function useInView(props: Props): void
