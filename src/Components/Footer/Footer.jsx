import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
    root: {
      width: 500,
    },
  });

const Footer = () => {
    return (
        <div>
            <Box m={2} pt={10}>
            <Divider />
            <Typography className={'wearMask'} align="center" pt={5} variant="subtitle1" gutterBottom>
                Wear a mask.
      </Typography>
      </Box>
        </div>
    )
}

export default Footer