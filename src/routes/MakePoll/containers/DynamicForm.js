import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import MakePoll from '../components/MakePoll'
import {capitalizeFirstLetter} from 'utils/general'

class DynamicForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired
  };

  render() {
    const { handleSubmit, onFormSubmit } = this.props
    return <MakePoll
      {...this.props}
      handleSubmit={handleSubmit(onFormSubmit.bind(this))}
    />
  }
}

function validate(formProps) {
  const errors = {}
  Object.keys(formProps).map((name) => {
    if (!formProps[name]) {
      errors[name] = `${capitalizeFirstLetter(name)} can't not be blank.`
    }
  })

  return errors
}

export default reduxForm({ form: 'MakePoll', validate })(DynamicForm)
