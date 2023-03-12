import { render } from '@testing-library/react'

import WebGumUi from './web-gum-ui'

describe('WebGumUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebGumUi />)
    expect(baseElement).toBeTruthy()
  })
})
