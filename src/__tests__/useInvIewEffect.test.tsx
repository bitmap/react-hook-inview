import React, { useState } from 'react'
import { render } from '@testing-library/react'
import { useInViewEffect } from '..'
import { mockInView } from '../__mocks__/mockInView'

describe('useInViewEffect', () => {
  const Component: React.FC = () => {
    const [inView, setInview] = useState(false)
    const ref = useInViewEffect(([entry]) => {
      setInview(entry.isIntersecting)
    })

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
    const Component2: React.FC = () => {
      const [inView, setInview] = useState(false)
      const ref = useInViewEffect(([entry], observer) => {
        setInview(entry.isIntersecting)

        if (entry.isIntersecting) {
          observer.unobserve(entry.target)
        }
      })

      return (
        <div ref={ref}>
          {inView.toString()}
        </div>
      )
    }
    const { getByText } = render(<Component2 />)

    mockInView(getByText('false'), true)
    mockInView(getByText('true'), false)

    expect(getByText('true')).toBeInTheDocument()
  })
})
