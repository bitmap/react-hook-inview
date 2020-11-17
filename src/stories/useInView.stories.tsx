import React from 'react'
import { Story, Meta } from '@storybook/react'
import useInView, { Options } from '../useInView'

const InView: React.FC<Options> = args => {
  const { rootMargin, threshold, unobserveOnEnter } = args

  const [ref, inView] = useInView({
    root: (document as unknown) as Element,
    rootMargin,
    threshold,
    unobserveOnEnter,
  })

  const inViewClass = inView ? ' in-view' : ''

  return (
    <section className="wrapper">
      <div className="instructions">&darr; Please Scroll &darr;</div>
      <div className={`component${inViewClass}`} ref={ref}>
        Hello World
      </div>
      <div className={`indicator${inViewClass}`}>
        inView: <span>{inView.toString()} </span>
      </div>
    </section>
  )
}

export default {
  title: 'InView',
  component: InView,
  argTypes: {
    threshold: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
  },
} as Meta

const Template: Story = args => <InView {...args} />

export const Default = Template.bind({})

Default.args = {
  threshold: 0,
  unobserveOnEnter: false,
}
