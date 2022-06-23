import React from 'react'
import styled, {withTheme} from 'styled-components'
import Text from './Text'

const Wrapper = styled.div`
  padding: 10px 0 10px 15px;
  min-height: 30px;
  display: grid;
  grid-template-columns: 3fr 2fr 15px 2fr;
  border-top: ${({theme}) => `1px solid ${theme.textGrey} `};
  :last-of-type {
    padding-bottom: 4px;
  }
`

const Cell = styled.div`
  display: flex;
  border-radius: 5px;
  align-items: center;
  justify-content: ${({center}) => (center ? 'center' : 'flex-start')};
`
const MuscleCell = styled(Cell)`
  background-color: ${({value, theme}) =>
    Number(value) >= 8
      ? theme.warningRed
      : Number(value) >= 5 && Number(value) <= 7
      ? theme.warningOrange
      : 'transparent'};
`
const SleepCell = styled(Cell)`
  background-color: ${({value, theme}) =>
    Number(value) <= 3
      ? theme.warningRed
      : Number(value) === 10
      ? theme.green
      : 'transparent'};
`

const TableRow = ({item = {}, children, ...props}) => (
  <Wrapper>
    <Cell>
      <Text size={12}>{item.name}</Text>
    </Cell>
    <MuscleCell center value={item.muscle}>
      <Text center size={12}>
        {item.muscle}
      </Text>
    </MuscleCell>
    <div />
    <SleepCell center value={item.sleep}>
      <Text center size={12}>
        {item.sleep}
      </Text>
    </SleepCell>
  </Wrapper>
)
export default withTheme(TableRow)
