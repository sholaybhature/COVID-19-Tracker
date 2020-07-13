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
    Confirmed: {
        color: '#FF073A',
    },
    Active: {
        color: '#007BFF',
    },
    Recovered: {
        color: '#28A745',
    },
    Deceased: {
        color: '#6C757D',
    },

}));

const Cards = ({ data: { confirmed, recovered, deceased, active } }) => {
    const classes = useStyles();
    if (!confirmed) {
        return <div className={styles.Loading}><Typography variant="h5" align="center">Loading...</Typography></div>
    }

    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item xs={6} md={3} id="confirmed">
                    <CardContent>
                        <Typography className={cx(styles.font, classes.Confirmed)} gutterBottom>
                            Confirmed
                        </Typography>
                        <Typography variant="h5" className={CountUp}>
                            <CountUp className={cx(styles.font, styles.CountUp)} start={0} end={confirmed} duration={2} seperator="," />
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={6} md={3} id="active">
                    <CardContent>
                        <Typography className={cx(styles.font, classes.Active)} gutterBottom>
                            Active
                        </Typography>
                        <Typography variant="h5">
                            <CountUp className={cx(styles.font, styles.CountUp)} start={0} end={active} duration={2} seperator="," />
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={6} md={3} id="recovered">
                    <CardContent>
                        <Typography className={cx(styles.font, classes.Recovered)} gutterBottom>
                            Recovered
                        </Typography>
                        <Typography variant="h5">
                            <CountUp className={cx(styles.font, styles.CountUp)} start={0} end={recovered} duration={2} seperator="," />
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={6} md={3} id="deceased">
                    <CardContent>
                        <Typography className={cx(styles.font, classes.Deceased)} gutterBottom>
                            Deceased
                        </Typography>
                        <Typography variant="h5">
                            <CountUp className={cx(styles.font, styles.CountUp)} start={0} end={deceased} duration={2} seperator="," />
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;