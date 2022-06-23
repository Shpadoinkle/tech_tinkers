import React from 'react'
import styled, {withTheme} from 'styled-components'

const Input = styled.input`
  outline: none !important;
  width: 300px;
  height: ${({lg = false}) => (lg ? 62 : 43)}px;
  text-indent: 17px;
  border: 1px solid ${({theme}) => theme.textGrey};
  border-radius: 6px;

  font-family: 'Roboto';
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.2px;
  color: ${({theme}) => theme.textLight};
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};

  &:focus {
    border-color: ${({theme}) => theme.textLight};
  }

  ::-webkit-input-placeholder {
    /* Edge */
    color: ${({theme}) => theme.textGrey};
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${({theme}) => theme.textGrey};
  }

  ::placeholder {
    color: ${({theme}) => theme.textGrey};
  }
`

const InputComponent = ({placeholder = 'Placeholder', ...props}) => (
  <Input placeholder={placeholder} {...props} />
)

export default withTheme(InputComponent)
