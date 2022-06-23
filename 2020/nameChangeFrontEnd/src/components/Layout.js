import React from 'react'
import {withRouter} from 'react-router-dom'

export default withRouter(({children}) => {
  return <div>{children}</div>
})
