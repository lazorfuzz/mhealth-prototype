import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LeaderboardIcon from '@material-ui/icons/FormatListNumbered';
import GiftIcon from '@material-ui/icons/CardGiftcard';
import RunIcon from '@material-ui/icons/DirectionsRun';
import ExploreIcon from '@material-ui/icons/Explore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Badge from '@material-ui/core/Badge';

const styles = {
  root: {
    width: '100%',
    'position': 'fixed',
    'bottom': 0
  },
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, navValue, challenges } = this.props;

    return (
      <BottomNavigation
        value={navValue}
        onChange={this.props.onNavChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
        <BottomNavigationAction label="Challenges" icon={<RunIcon />} />
        <BottomNavigationAction label="Leaderboards" icon={<LeaderboardIcon />} />
        <BottomNavigationAction label="Rewards" icon={<GiftIcon />} />
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);
