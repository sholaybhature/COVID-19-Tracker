import React from 'react';
import styles from './HeadBar.module.css';
import cx from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { faVirus } from '@fortawesome/free-solid-svg-icons';
import { faPumpSoap } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: '#1E1E30',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        color: '#f2f2f2',
        letterSpacing: 2,
        [theme.breakpoints.up('sm')]: {
            display: 'block',

        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
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
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '15ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    drawer: {
        
        width:240,
        flexShrink: 0,
      },
      drawerPaper: {
        width:240,
        background: '#1E1E30',
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      
      icon: {
        color: '#f2f2f2',
      },

      dividerColor: {
        backgroundColor: 'white',
      },
    
      
}));

const Head = () => {
    const [open, setOpen] = React.useState(false);

    const icons =[faHome,faDatabase,faGithub];
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar className={classes.root} position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={cx(styles.menuButton, classes.menuButton)}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                    C<FontAwesomeIcon className={styles.faVirus} icon={faVirus} />VID-19<FontAwesomeIcon className={styles.faPumpSoap} icon={faPumpSoap} />
              </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <MenuIcon className={classes.icon} />
                    </IconButton>
                </div>
                <Divider classes={{root: classes.dividerColor}}/>
                <List>
                    {['Home', 'Data', 'Contact'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon className={cx(classes.icon,styles.ListItemIcon)}>{<FontAwesomeIcon icon={icons[index]} />}</ListItemIcon>
                            <ListItemText disableTypography primary={<Typography type="body2" style={{ color: '#f2f2f2' }}>{text}</Typography>} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>

        </div>
    );
}

export default Head;