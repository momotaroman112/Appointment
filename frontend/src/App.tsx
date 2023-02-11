import React, { useEffect } from "react";
import clsx from "clsx";
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FaceIcon from '@mui/icons-material/Face';
import Chip from '@material-ui/core/Chip';
import Popover from "@material-ui/core/Popover";
import SignIn from "./components/SignIn";
import { EmployeeInterface } from "./models/IEmployee";
import CreateAppointment from "./components/CreateAppointment"
import Appointments from "./components/Appointment"
import AllInboxIcon from '@mui/icons-material/AllInbox';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    title: {
      flexGrow: 1,
      fontFamily: "Chakra Petch",
      fontSize: "1.5rem",
      color: "#fff",
      fontWeight: "bold",
      letterSpacing:2
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
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
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    a: {
      textDecoration: "none",
      color: "inherit",
    },
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
      borderRadius: "5%",
    },
  })
);
const theme = createTheme({
  palette: {
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#ffc400',
    },
  },
});

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = React.useState<String>("");
  const [employee, setEmploree] = React.useState<EmployeeInterface>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [index, setIndex] = React.useState<number>(0);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const openPopoverIndex = (index: number) => {
    setIndex(index);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openP = Boolean(anchorEl);

  //Get Data
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
  };
  const getEmployee = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/employee/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("employee",res.data);
        if (res.data) {
          setEmploree(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const menu = [
    { name: "บันทึกรายการนัดหมาย", icon: <AllInboxIcon />, path: "/Appointment" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    getEmployee();
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token || !employee) {
    return <SignIn />;
  }

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <BrowserRouter>
          <CssBaseline />
          {token && (
            <>
              <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                  [classes.appBarShift]: open,
                })}
              >
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                      [classes.hide]: open,
                    })}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                  G-01  ระบบจัดการคนไข้นอก
                  </Typography>
                  <Chip
                    size="medium"
                    icon={<FaceIcon style={{ color: '#009688' }} />}
                    label={employee?.Name + " ( " + employee?.Role.Position + " )"}
                    variant="outlined"
                    style={{ backgroundColor: '#fff', fontSize: '1rem', color: '#009688' }}
                  />
                  <Button color="inherit" onClick={signout} style={{ fontFamily: "Kanit" }}>
                    <ExitToAppIcon style={{ fontSize: 30, marginRight: 2 }} />
                  </Button>
                </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
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
              >
                <div className={classes.toolbar}>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "rtl" ? (
                      <ChevronRightIcon />
                    ) : (
                      <ChevronLeftIcon />
                    )}
                  </IconButton>
                </div>
                <Divider />
                <List>
                  <>
                    {menu.map((item, index) => (
                      <Link
                        to={item.path}
                        key={item.name}
                        className={classes.a}
                      >
                        <ListItem button>
                          <ListItemIcon
                            aria-owns={openP ? "mouse-over-popover" : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                            onMouseOver={() => openPopoverIndex(index)}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText primary={item.name} />
                        </ListItem>
                      </Link>
                    ))}
                  </>
                </List>
                <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={openP}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <>
                    <Typography style={{color:"#00bfa5"}}>{menu[index].name}</Typography>
                  </>
                </Popover>
              </Drawer>
            </>
          )}

          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div>
              <Routes>
                <Route path="/CreateAppointment" element={<CreateAppointment />} />
                <Route path="/Appointment" element={<Appointments />} />
              </Routes>
            </div>
          </main>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}