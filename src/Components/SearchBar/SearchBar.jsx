import React from 'react';
import styles from './SearchBar.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'inherit',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
},
searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
},
inputRoot: {
},
icon: {
    color: '#f2f2f2',
  },
inputInput: {
    borderBottom: '#000000',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    outline: '#000000',
    [theme.breakpoints.up('sm')]: {
        width: '15ch',
        '&:focus': {
            width: '20ch',
        },
    },

},
}));

function showCurrentTime () {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jul", "Aug", "Sept", "Oct", "Nov","Dec"];
    const d = new Date();
    const month = monthNames[d.getMonth()] 
    const date = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    const dateStr =  date + " " + month + " " + hours + ":" + minutes + " " + ampm + " " + "IST";
    return dateStr;
}

const Search = () => {
    const classes = useStyles();
    return (
        <div>
            <Container fixed className={styles.Container}>
            <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            className={styles.InputBase}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <Box pt={2}>
                        <Typography align="center" className={styles.showCurrentTime}>{showCurrentTime()}</Typography>
                    </Box>
            </Container>
        </div>
    )
}

export default Search;