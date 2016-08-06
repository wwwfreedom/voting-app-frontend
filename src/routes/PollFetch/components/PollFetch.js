import React, { PropTypes } from 'react'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import RaisedButton from 'material-ui/RaisedButton'
import {grey100} from 'material-ui/styles/colors'
import { small } from 'utils/windowsize.js'
import sty from './PollFetch.scss'

export const PollFetch = ({width, loading, poll, currentUser, handleOptionClick}) => {
  // const fullName = `${poll.createdBy.firstName} ${poll.createdBy.lastName}`
  const options = <div className={sty.optionDiv}>
    {poll.options.map((option) => {
      return <RaisedButton
        label={option.name}
        labelPosition='before'
        fullWidth
        backgroundColor={grey100}
        key={option._id}
        value={option._id}
        className={sty.optionButton}
        onTouchTap={handleOptionClick}
      />
    })}
  </div>

  const spinner = <div className={sty.loading}>
    <RefreshIndicator
      size={50}
      left={width < small ? 135 : 221}
      top={0}
      loadingColor={'#FF9800'}
      status='loading'
    />
  </div>

  return <div className={sty.container}>
    <Card className={sty.card}>
      <CardTitle title={poll.question} className={sty.question} />
      <CardActions className={sty.cardActions}>
        {loading ? spinner : options}
      </CardActions>
    </Card>
  </div>
}

PollFetch.propTypes = {
  width: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  poll: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  handleOptionClick: PropTypes.func.isRequired
}

export default PollFetch
