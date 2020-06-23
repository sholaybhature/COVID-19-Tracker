import React from 'react';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    Confirmed:{
        color:'#FF073A',
    },
    Active:{
        color:'#007BFF',
    },
    Recovered:{
        color:'#28A745',
    },
    Deceased:{
        color:'#6C757D',
    },
}));

const Cards = () => {
    const cases = [22334,10425, 12322, 125]
    const classes = useStyles();
    return (
        <h1>Hello</h1>
        <Grid container>
            <Grid item xs={12} md={3}>
                <CardContent>
                    <Typography className={classes.Confirmed} gutterBottom>
                        Confirmed
                        </Typography>
                    <Typography variant="h5">
                        <CountUp start={0} end={cases[0]} duration={2} seperator="," />
                    </Typography>
                </CardContent>
            </Grid>
            <Grid item xs={12} md={3}>
                <CardContent>
                    <Typography className={classes.Active} gutterBottom>
                        Active
                        </Typography>
                    <Typography variant="h5">
                        <CountUp start={0} end={cases[1]} duration={2} seperator="," />
                    </Typography>
                </CardContent>
            </Grid>
            <Grid item xs={12} md={3}>
                <CardContent>
                    <Typography className={classes.Recovered} gutterBottom>
                        Recovered
                        </Typography>
                    <Typography variant="h5">
                        <CountUp start={0} end={cases[2]} duration={2} seperator="," />
                    </Typography>
                </CardContent>
            </Grid>
            <Grid item xs={12} md={3}>
                <CardContent>
                    <Typography className={classes.Deceased} gutterBottom>
                        Deceased
                        </Typography>
                    <Typography variant="h5">
                        <CountUp start={0} end={cases[3]} duration={2} seperator="," />
                    </Typography>
                </CardContent>
            </Grid>
        </Grid>
    )
}

export default Cards;