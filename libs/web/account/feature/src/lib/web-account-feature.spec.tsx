import { render } from '@testing-library/react'

import WebAccountFeature from './web-account-feature'

describe('WebAccountFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebAccountFeature />)
    expect(baseElement).toBeTruthy()
  })
})
