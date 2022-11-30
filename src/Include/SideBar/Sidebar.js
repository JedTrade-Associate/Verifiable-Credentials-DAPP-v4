import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  CssBaseline,
  List,
  Drawer,
  Collapse,
  Avatar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { routingList } from "./RouteContent";
import { Link, useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import "./Sidebar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  sectionDesktop: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  headerShift: {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    // width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingLeft: "20px",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 0,
    // padding: theme.spacing(3)
  },
  nested: {
    paddingLeft: theme.spacing(3),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
}));

function SideBar(props) {
  let listConfig=[];  
 
 
  
  const history = useHistory();
  // const userInitials = localStorage.getItem('userInitials');
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [close, setClose] = React.useState(false);
  const [customClass, setCustomClass] = React.useState(null);
  const [customNewClass, setNewCustomClass] = React.useState(null);
  const [sublist, sublistOpen] = React.useState(true);
  const [loginUser, setLoginUser] = React.useState({});
  const [userInitials, setUserInitials] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [appVersion, setAppVersion] = React.useState("");
  const isCancelled = React.useRef(false);
  const [listConfigs, setlistConfigs] = React.useState([])
  const sidebarHeader = "sidebarHeader";
  const handleClick = () => {
    sublistOpen(!sublist);
  };
  const handleDrawerOpen = () => {
    setCustomClass("drawerOpenClass");
    setNewCustomClass("Sidebar sidebarslide");
    setOpen(true);
    setClose(false);
  };
  const handleDrawerClose = () => {
    setCustomClass("mainContent");
    setNewCustomClass("Sidebar");
    setOpen(false);
    setClose(true);
  };

  const getUser = async () => {    
    setLoader(true);
    try {
      // const response = await getUsers();
      // setLoader(false);
      // if (response && response.data) {
      //   console.log("Sidebar: setUserInfo: It is called");
      //   authService.setUserInfo(response.data);
      //   setLoginUser({
      //     name: capital_letter(response.data.name),
      //     email: response.data.email,
      //   });
      // }
    } catch (error) {
      setLoader(false);
    }
    setLoader(false);
  };

  const capital_letter = (str) => {
    str = str.split(" ");
    let letter = "";
    for (var i = 0, x = str.length; i < x; i++) {
      if(str[i]){
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      letter = letter + str[i][0].toUpperCase();
      }
    }
    setUserInitials(letter);
    return str.join(" ");
  };
  const setSideItems = async () => {  
    const arr = [];
    arr.push(routingList[0])
    arr.push(routingList[1])
    arr.push(routingList[2])

    setlistConfigs(arr);
  }
  
  useEffect(() => {   
    setSideItems();
    
    return () => {
      isCancelled.current = true;
    };
  }, []);

  window.addEventListener("storage", (e) => {
    if (e.key === "token" && e.oldValue && e.newValue === null) {
      LogOut();
    }
  });
  const LogOut = () => {
    return (window.location = "");
  };
  
  const profileScreen = () => {
    props.children.props.history.push("/profile");
  };

  const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear().toString();
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={customNewClass ? customNewClass : "Sidebar"}>
        <IconButton
          color="inherit"
          aria-label="open d+rawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
          style={{ color: "#4169e1" }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          variant="persistent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          open={open}
          anchor="left"
        >
          {/* the red part */}
          <div className={(classes.toolbar, sidebarHeader)}> 
  
             <p className="dashboardLogo">VC DAPP</p>
            <span
              onClick={() => history.push("/")}
              style={{ cursor: "pointer" }}
            >
            </span>
            <IconButton
              style={{ color: "#4169e1" }}
              className={clsx(classes.menuButton, {
                [classes.hide]: close,
              })}
              onClick={handleDrawerClose}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </div>
          <div className="profilePart">
            <div>
              <h5>{loginUser.name}</h5>
              <span>{loginUser.email}</span>
            </div>
          </div>
          <div className="outerDivForLists">
            <List className="lists">
              {listConfigs.map((items, index) => (
                <div
                  key={index}
                  className={items.className ? items.className : ""}
                >
                  {items.type === "subListType" ? (
                    <div className="subListHeadings">
                      <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                          <span className={items.icon}></span>
                        </ListItemIcon>
                        <ListItemText primary={items.title} />
                        {sublist ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={sublist} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {items.item.map((subitem, index) => (
                            <div>
                              <ListItem
                                button
                                className={classes.nested}
                                key={subitem.title}
                                component={Link}
                                to={`${subitem.path}`}
                              >
                                <ListItemIcon>
                                  <span className={items.icon}></span>
                                </ListItemIcon>
                                <ListItemText primary={subitem.title} />
                              </ListItem>
                            </div>
                          ))}
                        </List>
                      </Collapse>
                    </div>
                  ) : (
                    <div
                      className={
                        props.children.props.location.pathname === items.path
                          ? "sidebarColor"
                          : ""
                      }
                    >
                      <span key={index}>
                        <ListItem
                          button
                          // onClick={sidebarClick}
                          key={items.title}
                          component={Link}
                          to={`${items.path}`}
                          style={{marginTop: '25px'}}
                        >
                          <ListItemIcon>
                            <span className="icons">{items.image} </span>
                          </ListItemIcon>
                          <ListItemText primary={items.title} />
                        </ListItem>
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </List>
          </div>
          
        </Drawer>
      </div>
      {/*  */}
      <div className={customClass ? customClass : "drawerOpenClass"}>
        <div>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            {props.children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
