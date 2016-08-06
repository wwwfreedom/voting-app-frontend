import React, { PropTypes } from 'react'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import RaisedButton from 'material-ui/RaisedButton'
import {red200, green200, yellow200, cyan200, blue200, indigo300, teal300, lime600, lightgreen200, orange200, grey300, brown300} from 'material-ui/styles/colors'
import { small } from 'utils/windowsize.js'
import { VictoryPie } from 'victory'
import Chip from 'material-ui/Chip'
import { abbreviate } from 'utils/general'
import sty from './PollFetch.scss'
import { capitalizeFirstLetter } from 'utils/general'

export const PollFetch = ({width, loading, poll, currentUser, handleOptionClick, hasVoted, handleVoteClick, showVoteButtons}) => {
  const fullName = capitalizeFirstLetter(`${poll.createdBy.firstName} ${poll.createdBy.lastName}`)

  const colorArray = [ red200, green200, blue200, cyan200, yellow200, indigo300, teal300, lime600, lightgreen200, orange200, brown300, grey300
    ]

  const options = <div className={sty.optionDiv}>
    {poll.options.map((option, index) => {
      return <RaisedButton
        label={`${option.name} (${abbreviate(option.name)})`}
        labelPosition='before'
        fullWidth
        backgroundColor={colorArray[index]}
        key={option._id}
        value={option._id}
        className={sty.optionButton}
        onTouchTap={handleOptionClick}
        style={{overflow: 'hidden'}}
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

  const voteStats = <div className={sty.voteStats}>
    <h4>{`Total Votes: ${poll.voters.length}`}</h4>
    <h4>Vote Count:</h4>
    <div className={sty.chipDiv}>
      {poll.options.map((option, index) => {
        return <Chip
          className={sty.chip}
          key={option._id}
          style={{backgroundColor: colorArray[index]}}
          >
          {`${option.name} (${abbreviate(option.name)}): ${option.votes - 1}`}</Chip>
      })}
    </div>
  </div>

  const data = (options) => options.map((option) => {
    return {x: abbreviate(option.name), y: option.votes}
  })

  const pieChart = <VictoryPie
    style={{
      data: {
        stroke: 'black',
        strokeWidth: 0.3
      }
    }}
    data={data(poll.options)}
    colorScale={colorArray}
    animate={{
      duration: 1000,
      onEnter: {
        duration: 500
      }
    }}
  />

  const voteButton = <RaisedButton
    className={sty.voteButton}
    label={showVoteButtons ? 'See vote stats' : 'Click to vote'}
    labelPosition='before'
    backgroundColor={grey300}
    onTouchTap={handleVoteClick}
  />

  return <div className={sty.container}>
    <Card className={sty.card}>
      <CardTitle
        title={poll.question}
        subtitle={`Asked by: ${fullName}`}
        className={sty.question}
      />
      {pieChart}
      <CardText className={sty.voteButton}>
        {loading ? spinner : voteButton}
      </CardText>
      <CardActions className={sty.cardActions}>
        {showVoteButtons ? options : voteStats}
      </CardActions>
    </Card>
  </div>
}

PollFetch.propTypes = {
  width: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  hasVoted: PropTypes.bool.isRequired,
  poll: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  handleOptionClick: PropTypes.func.isRequired,
  handleVoteClick: PropTypes.func.isRequired,
  showVoteButtons: PropTypes.bool.isRequired
}

export default PollFetch
