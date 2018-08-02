import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FaceIcon from '@material-ui/icons/Face';
import FriendIcon from '@material-ui/icons/PersonPin';
import RewardIcon from '@material-ui/icons/LocalAtm';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const styles = {
  root: { height: '100%', width: '100%', position: 'absolute', top: 0 }
};

const PersonalMarker = ({ lat, lng, onMeClick }) => (
  <div
    lat={lat}
    lng={lng}
  >
    <Tooltip title="You">
      <Button
        variant="fab"
        color="secondary"
        aria-label="You"
        onClick={onMeClick}
      >
        <FaceIcon />
    </Button>
  </Tooltip>
</div>
);

const FriendMarker = ({ name, lat, lng, onMeClick }) => (
  <div
    key={name}
    lat={lat}
    lng={lng}
  >
    <Tooltip title={name}>
      <IconButton
        variant="fab"
        color="primary"
        aria-label={name}
        onClick={onMeClick}
      >
        <FriendIcon style={{ fontSize: '48px' }} />
    </IconButton>
  </Tooltip>
</div>
);

const RewardMarker = ({ name, lat, lng, onMeClick }) => (
  <div
    key={name}
    lat={lat}
    lng={lng}
  >
    <Tooltip title={name}>
      <IconButton
        variant="fab"
        color="secondary"
        aria-label={name}
        onClick={onMeClick}
      >
        <RewardIcon style={{ fontSize: '48px' }} />
    </IconButton>
  </Tooltip>
</div>
);

class SimpleMap extends Component {
  static defaultProps = {
    defaultCenter: {
      lat: 40.7982133,
      lng: -77.8620971
    },
    zoom: 16,
  };

  constructor(props) {
    super(props);
    this.state = {
      showFriend: false,
      showTreasure: false,
      chosenFriend: {},
      chosenTreasure: {}
    }
  }

  generateFriendDialog = (name) => {
    this.setState({
      showFriend: true,
      chosenFriend: this.props.friends[name]
    });
  }

  handleClose = () => this.setState({ showFriend: false, showTreasure: false });

  handleStart = () => {
    this.setState({ showTreasure: false });
    this.props.onStartTreasureHunt(this.state.chosenTreasure);
  }

  generateFriends = (lat, lng) => Object.keys(this.props.friends).map((f) => (
    <FriendMarker
      key={this.props.friends[f].id}
      name={this.props.friends[f].name}
      lat={lat + this.props.friends[f].latOffset}
      lng={lng + this.props.friends[f].lngOffset}
      onMeClick={() => this.generateFriendDialog(this.props.friends[f].id)}
    />
  ));

  generateRewards = (lat, lng) => this.props.rewards.map((r) => (
    <RewardMarker
      key={r.id}
      name={`${r.distance} miles`}
      lat={r.lat}
      lng={r.lng}
      onMeClick={() => this.generateRewardDialog(r)}
    />
  ));

  generateRewardDialog = (reward) => {
    this.setState({
      showTreasure: true,
      chosenTreasure: reward
    });
  }

  render() {
    const { theme, classes } = this.props;
    const { chosenFriend, showFriend, showTreasure, chosenTreasure } = this.state;

    const statContent = (
      <List>
        <ListItem>
          <ListItemText primary="Level" secondary={chosenFriend.level} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="XP" secondary={chosenFriend.xp} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Total Miles" secondary={chosenFriend.miles} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Rewards Redeemed" secondary={chosenFriend.rewards} />
        </ListItem>
      </List>
    );

    const treasureContent = (
      <List>
        <ListItem>
          <ListItemText primary="Contents" secondary="???" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Distance" secondary={`${chosenTreasure.distance} miles`} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="XP Gain" secondary={Math.floor(chosenTreasure.distance * 100 + Math.floor(Math.random() * 50))} />
        </ListItem>
      </List>
    );

    return (
      <div className={classes.root}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC-hOtsdLt63w9_Pfgc7Jt4i8QAce63I7g' }}
          defaultCenter={this.props.defaultCenter}
          center={this.props.center}
          defaultZoom={this.props.zoom}
          options={{
            zoomControl: false
          }}

        >
          <PersonalMarker
            lat={this.props.center.lat + .00012}
            lng={this.props.center.lng}
            onMeClick={this.props.onMeClick}
          />
          {this.generateFriends(this.props.center.lat, this.props.center.lng)}
          {this.generateRewards()}
        </GoogleMapReact>

        <Dialog open={showFriend} onClose={this.handleClose}>
          <DialogTitle>{chosenFriend.name}</DialogTitle>
          <DialogContent>
            {statContent}
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={showTreasure} onClose={this.handleClose}>
          <DialogTitle>Known Treasure Location</DialogTitle>
          <DialogContent>
            {treasureContent}
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              Close
            </Button>
            <Button color="primary" onClick={this.handleStart}>
              Start
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withTheme()(withStyles(styles)(SimpleMap));
