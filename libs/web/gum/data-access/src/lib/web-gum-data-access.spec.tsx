import { render } from '@testing-library/react'

import WebGumDataAccess from './web-gum-data-access'

describe('WebGumDataAccess', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebGumDataAccess />)
    expect(baseElement).toBeTruthy()
  })
})
