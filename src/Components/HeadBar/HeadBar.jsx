import React from 'react';
import styles from './HeadBar.module.css';
import cx from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import 'fontsource-roboto';
import svgMask from './coronavirus.svg'
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
        background: '#ffffff',
        overflow: 'hidden',

    },
    menuButton: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
        },
    },
    title: {
        flexGrow: 1,
        display: 'none',
        color: '#ffffff',
        letterSpacing: 2,
        [theme.breakpoints.up('sm')]: {
            display: 'block',

        },
    },

    drawer: {
        width: '25%',
        flexShrink: 0,
    },
    drawerPaper: {
        width: '100%',
        
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
        background: '#ffffff',
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
        color: 'black',

        [theme.breakpoints.down('md')]: {
            paddingRight: 15,
            paddingTop: 25,
        },


    },
    icon_list: {
        color: 'black',
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            paddingLeft: '15%',
        },
    },

    dividerColor: {
        backgroundColor: 'white',
    },
    drawerTitle: {
        color: '#28A745',
    },
    drawerTitle2: {
        color: '#007BFF',
    },
    drawersubTitle: {
        color: 'black',
    },
    credit: {
        color: 'gray',
        fontSize: 10,
        position: 'absolute',
        bottom: 0,
        left: '42%',
        [theme.breakpoints.down('md')]: {
            left: '20%',
        },
    },


}));

const Head = () => {
    
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    return (
        <div>

            <IconButton
                edge="start"
                className={cx(styles.menuButton, classes.menuButton)}
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
            >
                <MenuIcon />
            </IconButton>

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
                        <CloseIcon className={cx(classes.icon, styles.icon)} />
                    </IconButton>
                </div>
                <div align="center">
                    <Typography className={cx(classes.drawerTitle, styles.drawerTitle)} variant="h6" gutterBottom align="center" >
                        Wear a mask.
                    </Typography>
                    <img src={svgMask} className={styles.svgMask} alt="" width={200} height={100} />
                    <Typography className={cx(classes.drawerTitle, styles.drawerTitle2)} variant="h6" gutterBottom align="center" >
                        Where can I find the data for this?
                    </Typography>
                    <Typography className={cx(classes.drawersubTitle, styles.drawerTitle)} variant="subtitle2" gutterBottom align="center" >
                        This website is inspired from <a href="https://www.covid19india.org/" title="COVID19">covid19india.org</a>.<br></br> Data used to generate the graphs is available
                        on<br></br> their <a href="https://api.covid19india.org/" title="COVID19">API</a> for the website.
                    </Typography>
                    <Typography className={cx(classes.drawerTitle, styles.drawerTitle2)} variant="subtitle1" gutterBottom align="center" >
                        For more information, please visit <a href="https://www.covid19india.org/" title="COVID19">covid19india.org</a>.
                    </Typography>
                    <Typography className={cx(classes.drawerTitle2, styles.drawerTitle2)} variant="h6" gutterBottom align="center">
                        Feel free to give any suggestions.
                    </Typography>
                    
                    <a href="https://github.com/reedkihaddi/COVID-19-Tracker" title="git">
                        <IconButton
                            edge="start"
                            color="black"
                        >
                            <GitHubIcon />
                        </IconButton>
                    </a>
                </div>
            </Drawer>

        </div>
    );
}

export default Head;