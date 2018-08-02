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
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import RewardCard from './Card/';

const styles = theme => ({
  root: {
    width: '100%',
    padding: '5px 2em',
    marginBottom: '5em'
  },
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center'
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

class Rewards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      coupons: [
        {
          title: '$4 Veggie Footlong at Subway',
          description: 'Like the $5 footlong except you save a dollar. This coupon only applies to veggie sandwiches.',
          image: 'https://www.itsnicethat.com/system/files/082016/57a8ace67fa44c98d1002105/index_default/Subway-new-logo_itsnicethat_LIST.jpg?1470672327'
        },
        {
          title: '25% off at Panera',
          description: 'Panera Bread is a fast-casual bakery-cafe. Get 25% off any bagel or panini, and a free drink!',
          image: 'https://cdn.trintech.com/2017/01/panera-bread-logo.jpg'
        },
        {
          title: '10% off at Sweet Tomatoes',
          description: 'Sweet Tomatoes is a healthy, all-you-can-eat salad buffet restaurant chain. Enjoy 10% off the next time you visit!',
          image: 'st.jpg'
        },
        {
          title: '$10 off any $50 purchase',
          description: 'Whole Foods is a supermarket chain specializing in organic food. Also commonly known as "Whole Wallet."',
          image: 'wf.jpg'
        }
      ]
    };
  }

  generateCoupons = () => this.state.coupons.map(c => (
    <RewardCard
      title={c.title}
      description={c.description}
      image={c.image}
      onRedeem={this.handleRedeem}
    />
  ));

  handleRedeem = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { classes, challenges } = this.props;
    const { open } = this.state;
    const redeemContent = (
      <div>
        <Typography>Your coupon has been emailed! Enjoy!</Typography>
      </div>
    );

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          {this.generateCoupons()}
        </div>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Coupon Redeemed</DialogTitle>
          <DialogContent>
            {redeemContent}
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Rewards);
