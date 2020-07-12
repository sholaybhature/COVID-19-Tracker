import React, { useRef, Component, useState, useEffect } from 'react';
import styles from './SearchBar.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { listState } from '../CountryPicker/CountryPicker'


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '50%',
            marginLeft: '25%',
            [theme.breakpoints.down('sm')]: {
                marginLeft: '22%'
            },

        },
    },
    searchIcon: {
        paddingLeft: '1ch',

    },
    textField: {
        [theme.breakpoints.down('sm')]: {
            width: '25ch',
        },
    },


}));

function showCurrentTime() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const d = new Date();
    const month = monthNames[d.getMonth()]
    const date = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    const dateStr = date + " " + month + " " + hours + ":" + minutes + " " + ampm + " " + "IST";
    return dateStr;
}





const Search = () => {

    const [searchInput, setSearchInput] = useState('')
    const classes = useStyles();

    function changeSelected() {
        var sel = document.getElementsByClassName('select-box')
        var opts = sel[0].options;
        console.log(opts[8].value)
        //console.log(searchInput)
        for (var opt, j = 0; opt = opts[j]; j++) {
            console.log(opt.value)
            if (opt.value == searchInput) {
                sel[0].selectedIndex = j;
                setSearchInput('');
                var elmntToView = document.getElementsByClassName('my-svg-chart');
                elmntToView[0].scrollIntoView({
                    behavior: 'smooth'
                });
                break;
            }
        }

    }

    return (
        <div>
            <Container fixed className={styles.Container}>
                <div className={classes.search}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField className={'search-box', classes.textField} id="standard-basic" label="Search for a state" variant="outlined" onChange={e => setSearchInput(e.target.value)}
                            value={searchInput}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton className={cx('searchButton', classes.searchIcon)} onClick={changeSelected}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />
                    </form>

                    {/* <InputBase
                            placeholder="Search…"
                            className={styles.InputBase}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        /> */}
                </div>
                <Box pt={2}>
                    <Typography align="center" className={styles.showCurrentTime}>{showCurrentTime()}</Typography>
                </Box>
            </Container>
        </div>
    )
}

export default Search;