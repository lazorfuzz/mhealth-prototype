import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    padding: '5px',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    marginBottom: '5em'
  },
  avatar: {
    margin: 10,
  },
  paper: {
    width: 500,
    maxWidth: '90%'
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class Leaderboards extends React.Component {

  generateLeaders = () => Object.keys(this.props.friends).map((f, i) => (
    <ListItem key={this.props.friends[f].name}>
      <Avatar className={this.props.classes.purpleAvatar}>{`#${i + 1}`}</Avatar>
      <ListItemText primary={this.props.friends[f].name} secondary={`${this.props.friends[f].xp} XP`} />
    </ListItem>
  ));

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="display1">Best of the Best</Typography>
        <br />
        <Paper className={classes.paper}>
          <List>
            {this.generateLeaders()}
            <ListItem key="you">
              <Avatar className={this.props.classes.orangeAvatar}>{'#5'}</Avatar>
              <ListItemText primary="You" secondary="3457 XP" />
            </ListItem>
          </List>
        </Paper>
      </div>
    );
  }
}

Leaderboards.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Leaderboards);
