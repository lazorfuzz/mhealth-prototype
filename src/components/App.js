import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import withRoot from '../withRoot';
import Footer from './Footer/';
import Header from './Header/';
import Map from './Map/';
import Challenges from './Challenges/';
import Leaderboards from './Leaderboards/';
import Rewards from './Rewards/';
import { toRadians, randNum, generateNewRewards } from './util';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 12,
    height: '100%',
    overflowY: 'hidden',
    overflowX: 'hidden',
    webkitOverflowScrolling: 'touch'
  },
});

const messages = [
  'Jason Gonzalez beat your high score!',
  'Leon Li accepted your challenge invite!',
  'Alison Murphy accepted your friend request!',
  'Alex Salazar reached level 25!',
  'LeBron James is online!'
];

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      firstOpen: true,
      openSnack: false,
      message: messages[Math.floor(Math.random() * messages.length)],
      navValue: 0,
      coords: { lat: 40.7982133, lng: -77.8620971 },
      rewards: [],
      challenges: [],
      friends: {
        lebron: {
          name: 'LeBron James',
          id: 'lebron',
          level: 98,
          xp: '984,223,129',
          miles: '198,485,835,203',
          rewards: 867,
          latOffset: .0015,
          lngOffset: -0.0016
        },
        alex: {
          name: 'Alex Salazar',
          id: 'alex',
          level: 6,
          xp: '18,529',
          miles: '265.6',
          rewards: 21,
          latOffset: -.0045,
          lngOffset: 0.004
        },
        jason: {
          name: 'Jason Gonzalez',
          id: 'jason',
          level: 6,
          xp: '18,411',
          miles: '268.2',
          rewards: 321,
          latOffset: .0048,
          lngOffset: 0.002
        },
        leon: {
          name: 'Leon Li',
          id: 'leon',
          level: 6,
          xp: '18,129',
          miles: '256',
          rewards: 83,
          latOffset: -.004,
          lngOffset: -0.0031
        }
      }
    };
  }

  componentDidMount() {
    this.setLocation();
  }

  componentDidUpdate() {
    const { coords, rewards } = this.state;
    const nearby = this.state.rewards.filter((r) => {
      return (Math.abs(r.lat - coords.lat) < .011 && Math.abs(r.lng - coords.lng) < .011);
    });
    if (!nearby.length || nearby.length < 2) {
      const newRewards = generateNewRewards(coords, rewards);
      this.setState({ rewards: [...rewards, ...newRewards]});
    }
  }



  setLocation = () => {
    const { coords } = this.state;
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((position) => {
        this.setState({ coords: { lat: position.coords.latitude, lng: position.coords.longitude } });
      }, (error) => console.log(error), options);
    }
    return coords;
  };

  handleClose = () => {
    const first = this.state.firstOpen;
    this.setState({
      open: false,
    }, () => { setTimeout(() => { this.setState({ firstOpen: false, openSnack: first ? true : false }); }, 1000); });
  };

  handleSnackClick = () => {
    this.setState({
      openSnack: true,
    });
  };

  handleSnackClose = () => {
    this.setState({
      openSnack: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  handleTreasureSelect = (treasure) => {
    const { challenges } = this.state;
    if (challenges.filter(c => c.id === treasure.id).length) return;
    this.setState({ challenges: [...challenges, treasure], openSnack: true, message: 'Challenge started!' });
  }

  handleCancelChallenge = (challenge) => {
    const { challenges } = this.state;
    const updatedChallenges = challenges.filter(c => c.id !== challenge.id);
    this.setState({ challenges: updatedChallenges });
  }

  handleRedeem = () => this.setState({  })

  render() {
    const { classes } = this.props;
    const { open, firstOpen, navValue } = this.state;

    const statContent = (
      <List>
        <ListItem>
          <ListItemText primary="Level" secondary="3" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="XP" secondary="3457" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Total Miles" secondary="17.38" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Rewards Redeemed" secondary="7" />
        </ListItem>
      </List>
    );

    const motd = (
      <div>
        <DialogContentText>Today is a special day. To celebrate the month of August, we've added in some hidden
        treasures! Here's a hint on where you can find one: two miles to your east 😉<br /><br />
      Find the treasure within the next four hours to reveal the reward!</DialogContentText><br />
      <DialogContentText>Argh,<br />Capt. Ded Beerd</DialogContentText>
      </div>
    );

    return (
      <div className={classes.root}>
        <Header />
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>{firstOpen ? 'Message of the Day!' : 'Your Stats & Info'}</DialogTitle>
          <DialogContent>
            {firstOpen ? motd : statContent}
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        {
          navValue === 0 &&
          <Map
            center={{ lat: this.state.coords.lat, lng: this.state.coords.lng, }}
            rewards={this.state.rewards}
            friends={this.state.friends}
            onMeClick={this.handleClick}
            onStartTreasureHunt={this.handleTreasureSelect}
          />
        }
        {
          navValue === 1 &&
          <Challenges
            challenges={this.state.challenges}
            cancelChallenge={this.handleCancelChallenge}
          />
        }
        {
           navValue === 2 &&
           <Leaderboards
             friends={this.state.friends}
           />
        }
        {
          navValue === 3 &&
          <Rewards
            friends={this.state.friends}
          />
        }
        <Footer
          navValue={this.state.navValue}
          onNavChange={(evt, value) => this.setState({ navValue: value })}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.openSnack}
          autoHideDuration={4000}
          onClose={this.handleSnackClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleSnackClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
