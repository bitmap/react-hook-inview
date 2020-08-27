import { act } from '@testing-library/react'

let currentCallback: IntersectionObserverCallback | null = null
let currentObserver: IntersectionObserver | null = null

window.IntersectionObserver = jest.fn((callback, options) => {
  const thresholds = ((): number[] => {
    const n = options?.threshold
    if (!n) return [0]
    return Array.isArray(n) ? n : [n]
  })()

  const observe = jest.fn(() => {
    currentCallback = callback
    currentObserver = observer
  })

  const unobserve = jest.fn(() => {
    currentCallback = null
    currentObserver = null
  })

  const disconnect = jest.fn(() => {
    currentCallback = null
    currentObserver = null
  })

  const observer: IntersectionObserver = {
    root: options?.root || null,
    rootMargin: options?.rootMargin || '0px 0px 0px 0px',
    thresholds,
    observe,
    unobserve,
    disconnect,
    takeRecords: jest.fn(),
  }

  return observer
})

export function mockInView(target: Element, isIntersecting: boolean): void {
  const callback = currentCallback
  const observer = currentObserver

  if (callback && observer) {
    const entry: IntersectionObserverEntry = {
      isIntersecting,
      target,
      intersectionRatio: isIntersecting ? 1 : 0,
      boundingClientRect: target.getBoundingClientRect(),
      intersectionRect: target.getBoundingClientRect(),
      rootBounds: target.getBoundingClientRect(),
      time: 0,
    }

    act(() => callback([entry], observer))
  }
}
