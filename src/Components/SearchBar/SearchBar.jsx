import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import cx from 'classnames';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { searchState } from '../CountryPicker/CountryPicker'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '50%',
            marginLeft: '25%',
            [theme.breakpoints.down('sm')]: {
                marginLeft: '22%'
            },
            [theme.breakpoints.between('sm', 'md')]: {
                marginLeft: '30%'
            },
            [theme.breakpoints.only('md')]: {
                marginLeft: '27%'
            },

        },
    },
    ListItem: {
        backgroundColor: theme.palette.background.paper,
        "&:hover": {
            backgroundColor: "#FFF"
        }
    },
    ListItemBox: {
        boxShadow: '5px'
    },
    searchIcon: {
        paddingLeft: '1ch',

    },
    textField: {
        [theme.breakpoints.down('sm')]: {
            width: '25ch',
        },
        '&:hover': {
            boxShadow: '5px 5px 5px rgba(0, 0, 0, .13)',
        },


    },


}));


const Search = () => {

    const [searchInput, setSearchInput] = useState('')
    const [suggestions, setSuggestions] = useState([]);
    const classes = useStyles();

    //Update my svg
    function changeSelected() {
        var sel = document.getElementsByClassName('select-box')
        var opts = sel[0].options;
        for (var opt, j = 0; opt = opts[j]; j++) {
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

    //Update searchiInput 
    function onTextChanged(e) {
        setSearchInput(e.target.value)
        let suggestions = [];
        //Check if the country is present 
        try {
            if (searchInput.length > 0) {
                const regex = new RegExp(`^${searchInput}`, 'i');
                suggestions = searchState.sort().filter(v => regex.test(v));
            }
        }
        catch (error) {
            console.log('Regex search')
        }
        setSuggestions(suggestions)
    }

    //Something is wrong here, might need to use useEffect, can't seem to make it work.
    function suggestionSelected(value) {
        //setSuggestions([]);
        setSearchInput(value)
    }


    //Updating this because it doesn't capture last character of input.
    // useEffect(() => {
    //     checkSuggestions();
    // }, [searchInput]);

    //Show country suggestions
    function renderSuggestions() {
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <List className={classes.ListItemBox}>
                {suggestions.map((item) => <ListItem className={cx('listSuggestions', classes.ListItemClick)}
                    onClick={() => { setSuggestions([]); suggestionSelected(item); }}>{item}</ListItem>)}
                <Divider light />
            </List>
        )

    }

    return (
        <div>
            <Container fixed className={styles.Container}>
                <div className={classes.search}>
                    <form className={classes.root} noValidate autoComplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                        <TextField className={'search-box', classes.textField} id="standard-basic" label="Search for a state" variant="outlined"
                            onChange={onTextChanged}
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
                        {renderSuggestions()}
                    </form>
                </div>
                <Box pt={2}>
                    <Typography align="center" className={styles.showCurrentTime}>{showCurrentTime()}</Typography>
                </Box>
            </Container>
        </div>
    )
}

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
    const dateStr = date + " " + month + " " + hours + ":" + minutes + " " + ampm + " " + "IST";
    return dateStr;
}


export default Search;