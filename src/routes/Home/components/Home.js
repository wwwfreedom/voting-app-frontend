import React, { PropTypes } from 'react'
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'
import { small } from 'utils/windowsize.js'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import {List, ListItem} from 'material-ui/List'
import {blue50, darkBlack} from 'material-ui/styles/colors'
import moment from 'moment'
import {Link} from 'react-router'
import sty from './Home.scss'
import { truncateWithEllipses } from 'utils/general'
import AppIcon from 'material-ui/svg-icons/device/graphic-eq'
import RaisedButton from 'material-ui/RaisedButton'

export const Home = ({polls, width, loading, onMakePollClick}) => {
  const pollListItems = polls.map((poll, index) => {
    const totalVotes = poll.voters.length
    const fullName = `${poll.createdBy.firstName} ${poll.createdBy.lastName}`
    const creator = (
      <div key={index + 9} className={sty.creatorDiv}>
        by:
        <Link key={index + 10}
          className={sty.creator}
          to={`/users/profile/${poll.createdBy._id}`}>
          {fullName}
        </Link>
      </div>
    )
    const question = () => {
      if (width < small) return truncateWithEllipses.apply(poll.question, [30, true])
      return truncateWithEllipses.apply(poll.question, [50, true])
    }
    return <Link to={`/poll/${poll._id}`} style={{textDecoration: 'none'}}>
      <ListItem
        key={index}
        rightIconButton={creator}
        primaryText={question()}
        style={{borderBottom: `0.3px solid ${blue50}`}}
        secondaryText={
          <p>
            {`Created ${moment(poll.createdAt).fromNow()}`} <br />
            <span style={{color: darkBlack}}>{`Total votes: ${totalVotes}`}</span>
          </p>
        }
        secondaryTextLines={2}
      />
    </Link>
  })

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
      <div className={sty.appIconDiv}>
        <AppIcon className={sty.appIcon} />
      </div> 
      <CardTitle
        className={sty.question}
        title='Create and share your own polls'
      />
      <CardActions className={sty.makePollButton}>
        <RaisedButton
          label='Create Poll'
          primary
          onTouchTap={onMakePollClick}
        />
      </CardActions>
    </Card>
    <Card className={sty.card}>
      <CardTitle
        title='List of latest polls'
        className={sty.question}
        subtitle='Select a poll to vote or view the results.'
      />
      <CardText className={sty.actionDiv}>
        {loading ? spinner : <List>{pollListItems}</List>}
      </CardText>
    </Card>
  </div>
}

Home.propTypes = {
  polls: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  onMakePollClick: PropTypes.bool.isRequired
}

export default Home
