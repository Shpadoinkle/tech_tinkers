import React from 'react'
import styled, {withTheme} from 'styled-components'

/**
 * Regular Text
 */
const TextRegular = styled.p`
  font-family: 'Roboto';
  font-size: ${({size}) => (size ? `${size}px` : '1rem')};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  text-align: ${({center}) => (center ? 'center' : 'left')};
  color: ${({color, theme}) => (color ? color : theme.textLight)};
`
const Text = ({children, ...props}) => (
  <TextRegular {...props}>{children}</TextRegular>
)
export default withTheme(Text)
