import React from 'react'
import "./SelectField.scss"
import Select from 'react-select'

const SelectField = (props) => (
  <Select
  options={props.options}
      placeholder={props.placeholder}
  />
)

export default SelectField
