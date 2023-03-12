import { render } from '@testing-library/react'

import WebGumFeature from './web-gum-feature'

describe('WebGumFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebGumFeature />)
    expect(baseElement).toBeTruthy()
  })
})
