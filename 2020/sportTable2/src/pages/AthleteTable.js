import React from 'react'
import styled, {withTheme} from 'styled-components'
import TableRow from '../components/TableRow'
import Text from '../components/Text'

const TableWrapper = styled.div`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  background-color: ${({theme}) => theme.tableBackground};
  .header {
    padding: 8px 0 12px 15px;
    display: grid;
    grid-template-columns: 3fr 2fr 15px 2fr;
    align-items: center;
  }
`
const TableHeader = styled(Text)`
  @media only screen and (max-width: 500px) {
    font-size: 12px;
  }
`

const AthleteTable = ({list = [], children, ...props}) => (
  <TableWrapper>
    <div className="header">
      <TableHeader>ATHLETE</TableHeader>
      <TableHeader center>MUSCLE SORENESS</TableHeader>
      <div />
      <TableHeader center>SLEEP QUALITY</TableHeader>
    </div>
    {list.map((e) => (
      <TableRow key={e.name} item={e} />
    ))}
  </TableWrapper>
)
export default withTheme(AthleteTable)
