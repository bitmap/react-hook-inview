import React, { useState, useRef } from 'react'
import { render } from '@testing-library/react'
import { useInView } from '..'
import { mockInView } from '../../test/utils'

describe('useInView', () => {
  const Component: React.FC = () => {
    const [ref, inView] = useInView()

    return (
      <div ref={ref}>
        {inView.toString()}
      </div>
    )
  }

  test('renders unobserved', () => {
    const { getByText } = render(<Component />)
    expect(getByText('false')).toBeInTheDocument()
  })

  test('renders observed', async () => {
    const { getByText } = render(<Component />)

    mockInView(getByText('false'), true)

    expect(getByText('true')).toBeInTheDocument()
  })

  test('renders unobserved and observed', async () => {
    const { getByText } = render(<Component />)
    mockInView(getByText('false'), true)
    mockInView(getByText('true'), false)

    expect(getByText('false')).toBeInTheDocument()
  })

  test('unobserves on enter', async () => {
    const Component: React.FC = () => {
      const [ref, inView] = useInView({
        unobserveOnEnter: true,
      })

      return (
        <div ref={ref}>
          {inView.toString()}
        </div>
      )
    }
    const { getByText } = render(<Component />)

    mockInView(getByText('false'), true)
    mockInView(getByText('true'), false)

    expect(getByText('true')).toBeInTheDocument()
  })

  test('legacy methods', async () => {
    const Component: React.FC = () => {
      const ref = useRef<HTMLDivElement>(null)
      const [inView, setInView] = useState(false)
      useInView({
        target: ref,
        onEnter: () => {
          setInView(true)
        },
        onLeave: () => {
          setInView(false)
        },
      })

      return (
        <div ref={ref}>
          {inView.toString()}
        </div>
      )
    }
    const { getByText } = render(<Component />)

    mockInView(getByText('false'), true)
    mockInView(getByText('true'), false)

    expect(getByText('false')).toBeInTheDocument()
  })


  test('root option', async () => {
    const ComponentWithRoot: React.FC = () => {
      const rootRef = useRef<HTMLDivElement | null>(null)

      const [ref, inView, entry, observer] = useInView({
        root: rootRef.current,
      })
      const root = observer?.root
      const text = !!root

      return (
        <div ref={rootRef}>
          <div ref={ref}>
            {text.toString()}
          </div>
        </div>
      )
    }

    const { getByText } = render(<ComponentWithRoot />)

    mockInView(getByText('false'), false) // Renders 'undefined' here
    mockInView(getByText('false'), false) // Renders 'null' here

    expect(getByText('true')).toBeInTheDocument()
  })
})
