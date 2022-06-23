import React, {Component} from 'react'
import styled, {withTheme} from 'styled-components'
import Text from '../components/Text'
import PageWrapper from '../components/PageWrapper'
import Padder from '../components/Padder'
import AthleteTable from './AthleteTable'
import Input from '../components/Input'
import {sortBy} from 'lodash'

import athleteInfo from '../wellness.json'

const Styles = styled.div`
  background-color: ${({theme}) => theme.backgroundColor};
  min-height: 100%;
  min-width: 100%;
`

class home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      list: sortBy(
        athleteInfo.athlete.map((e, i) => ({
          name: athleteInfo.athlete[i],
          muscle: athleteInfo['muscle-soreness'][i],
          sleep: athleteInfo['sleep-quality'][i],
        })),
        ['name']
      ),
    }
  }

  render() {
    const {filter, list} = this.state
    let filteredList = !filter
      ? list
      : list.filter(
          (e) =>
            e.name.toLowerCase().includes(filter.toLocaleLowerCase()) ||
            e.muscle.includes(filter) ||
            e.sleep.includes(filter)
        )

    return (
      <Styles>
        <PageWrapper>
          <Padder h={40} />
          <Text size={30}>WELLNESS REPORT</Text>
          <Padder h={30} />
          <Input
            placeholder="Filter athletes..."
            onChange={(e) => {
              this.setState({filter: e.target.value})
            }}
          />
          <Padder h={30} />
          <AthleteTable list={filteredList} />
        </PageWrapper>
      </Styles>
    )
  }
}

export default withTheme(home)
