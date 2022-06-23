import React from 'react'

const Padder = ({h = 20, w = 20, inline = false}) => (
  <div
    style={{height: h, width: w, display: inline ? 'inline-block' : 'block'}}
  />
)

export default Padder
