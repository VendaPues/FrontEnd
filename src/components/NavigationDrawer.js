import React, {Component} from 'react';
import clsx from 'clsx';
import { withStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

import Grid from '@material-ui/core/Grid';

import Swal from 'sweetalert2';

import MainViewCards from '../components/MainViewCards'

class NavigationDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }

        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.logout = this.logout.bind(this);

    }

    handleDrawerOpen() {
        this.setState({ open: true });
    };

    handleDrawerClose() {
        this.setState({ open: false });
    };
    
    logout(){
        Swal.fire('Vuelve pronto!', 'Cierre de sesión exitosa', 'success')
        this.props.signOff();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: this.state.open,
              })}
            >
              <Toolbar position="fixed">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, this.state.open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={this.state.open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
                
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  {classes.direction === 'ltr' ?  <ChevronRightIcon/> : <ChevronLeftIcon />}
                </IconButton>
              </div>

              <Divider />
              <Grid>
              <Card className={classes.rootCard}>
                <CardHeader
                    className={classes.cardHeader}
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        A
                    </Avatar>
                    }
                    title="admin"
                    subheader="admin"
                />
              </Card>
              </Grid>
             
            
                {localStorage.getItem("isLoggedIn") === "true" &&
                <Grid>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.signOff}
                    onClick={this.logout}
                >
                    Log out
                </Button></Grid>}

            </Drawer>
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: this.state.open,
              })}
            >
              <div className={classes.drawerHeader} />
              <div>
              <MainViewCards></MainViewCards>
              </div>
            </main>
          </div>
        )
    }
}
const drawerWidth = 240;


const styles = theme => ({
    root: {
        display: 'flex',
    },
    rootCard: {
        width: "auto",
        alignItems: "center",
        alignContent: "center",
        marginBottom: "100%"
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    avatar: {
        backgroundColor: "#CF9A00",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    cardHeader : {
        margin: "auto"
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    signOff: {
       
        position:"static",
        bottom:"10%",
        right:"75px",
        marginTop: "20%"

    }
});


export default withStyles(styles, { withTheme: true })(NavigationDrawer);