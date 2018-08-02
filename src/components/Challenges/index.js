import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ChallengeButton from './ChallengeButton';

const styles = theme => ({
  root: {
    width: '100%',
    padding: '5px 2em',
    marginBottom: '5em'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

class Challenges extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  generateChallenges = (classes) => this.props.challenges.map((c) => (
    <ExpansionPanel key={c.id}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.column}>
          <Typography className={classes.heading}>Treasure Hunt</Typography>
        </div>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>{`${c.distance} miles`}</Typography>
        </div>
      </ExpansionPanelSummary>
      <Divider />
      <ExpansionPanelActions>
        <Button size="small" onClick={() => this.props.cancelChallenge(c)}>Cancel</Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  ));

  render() {
    const { classes, challenges } = this.props;
    return (
      <div className={classes.root}>
        {
          !challenges.length &&
          <div>
            <Typography variant="display1">No challenges!</Typography><br />
            <ChallengeButton>Challenge Friend</ChallengeButton>
          </div>
        }
        <Paper>
          {
            challenges.length > 0 &&
            this.generateChallenges(classes)
          }
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Challenges);
