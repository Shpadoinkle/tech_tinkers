import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0px 25px;
`
const PageWrapper = ({children}) => <Wrapper>{children}</Wrapper>

export default PageWrapper
