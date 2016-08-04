import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardText from 'material-ui/Card/CardText'
import Textfield from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'
import { small } from 'utils/windowsize.js'
import sty from './MakePoll.scss'

export const MakePoll = ({fields, handleSubmit, labels, width, loading, handleAdd, onOptionDelete}) => (
  <form className={sty.container} onSubmit={handleSubmit}>
    <Card className={sty.card}>
      <CardText expandable={false} className={sty.formBody}>
        {Object.keys(fields).map(name => {
          const field = fields[name]
          if (name === 'question') {
            return <Textfield
              floatingLabelText={labels[name]}
              floatingLabelStyle={{fontWeight: '400'}}
              errorText={field.touched && field.error && field.error}
              fullWidth
              key={name}
              {...field}
            />
          } else {
            return <div className={sty.optionDiv}>
              <Textfield
                className={sty.optionTextfield}
                floatingLabelText={labels[name]}
                floatingLabelStyle={{fontWeight: '400'}}
                errorText={field.touched && field.error && field.error}
                key={name}
                {...field}
              />
              <IconButton
                tooltip={`Delete ${labels[name]}`}
                onTouchTap={onOptionDelete}
                tooltipPosition='top-center'
                touch
                value={name}
                style={{marginTop: 'auto'}}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          }
        })}
      </CardText>
      <CardActions className={sty.cardActions}>
        {loading ? <div className={sty.loading}>
          <RefreshIndicator
            size={50}
            left={width < small ? 135 : 221}
            top={0}
            loadingColor={'#FF9800'}
            status='loading'
          />
        </div>
        : <div className={sty.actionButtons}>
          <RaisedButton
            label='Create Form'
            labelPosition='before'
            primary
          >
            <input type='submit' className={sty.input} />
          </RaisedButton>
          <RaisedButton
            label='More Option'
            onTouchTap={handleAdd}
            secondary
          />
        </div>
      }
      </CardActions>
    </Card>
  </form>
)

MakePoll.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  labels: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  handleAdd: PropTypes.func.isRequired,
  onOptionDelete: PropTypes.func.isRequired
}

export default MakePoll
