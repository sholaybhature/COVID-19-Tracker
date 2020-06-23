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