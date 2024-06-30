import React from 'react'
import "./SelectField.scss"
import Select from 'react-select'

const SelectField = (props) => (
    <>
    <label className={props.labelClass ? props.labelClass : "label-hide" }>{props.label}</label>
  <Select
  options={props.options}
      placeholder={props.placeholder}
  />
      </>
)

export default SelectField
