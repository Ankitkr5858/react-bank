import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import Home from "./Home";
import "./App.css";

function App() {
    const drawerWidth = 240;
    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
            position: "relative",
            flexDirection: "column",
            [theme.breakpoints.up('md')]: {
                flexDirection: "row",
            }
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'block'
            }
        },
        drawerPaper: {
            position: 'relative',
            height: 'auto',
            [theme.breakpoints.up('md')]: {
                width: drawerWidth,
                height: '100%'
            },
        },
        toolbar: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'block'
            },
            ...theme.mixins.toolbar
        },
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(1),
            [theme.breakpoints.up('md')]: {
                padding: theme.spacing(3),
                width: "100%"
            },
        },
    }));
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar} display={{ md: 'none' }}>
                <Toolbar>
                    <Typography variant="h6" noWrap></Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar}/>
                <Divider/>
                <List>
                    {["Banks"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                <AccountBalanceIcon/>
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Home/>
            </main>
        </div>
    );
}

export default App;
