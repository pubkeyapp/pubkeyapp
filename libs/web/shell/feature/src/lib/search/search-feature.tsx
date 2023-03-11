import { Flex } from '@mantine/core'
import { Route, Routes } from 'react-router-dom'
import { SearchBox } from '@pubkeyapp/web/search/ui'

export function SearchFeature() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Flex h="100%" align="center" justify="center" direction="column">
            <SearchBox />
          </Flex>
        }
      />
    </Routes>
  )
}
