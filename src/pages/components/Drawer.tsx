import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let navigate = useNavigate();

  const handleMenuClick = (route: any) => {
    navigate(route);
    handleDrawerClose();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Sistema de Gestão para Biblioteca
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding onClick={() => handleMenuClick(`/`)}>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              Início
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => handleMenuClick(`/books`)}>
            <ListItemButton>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              Galeria de Livros
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => handleMenuClick(`/lector`)}>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              Leitores cadastrados
            </ListItemButton>
          </ListItem>
          <Divider />
          <h6 className="text-center p-2">Leitor</h6>

          <ListItem
            disablePadding
            onClick={() => handleMenuClick(`/registerlector`)}
          >
            <ListItemButton>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              Cadastrar Leitor
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            onClick={() => handleMenuClick(`/withdrawbook`)}
          >
            <ListItemButton>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              Retirar Livro
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => handleMenuClick(`/returnbook`)}
          >
            <ListItemButton>
              <ListItemIcon>
                <WorkHistoryIcon />
              </ListItemIcon>
              Devolver Livro
            </ListItemButton>
          </ListItem>
          <Divider />
          <h6 className="text-center p-2">Livro</h6>
          <ListItem
            disablePadding
            onClick={() => handleMenuClick(`/createauthor`)}
          >
            <ListItemButton>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              Cadastrar Autor
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => handleMenuClick(`/author`)}>
            <ListItemButton>
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              Listar Autores
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => handleMenuClick(`/createcategory`)}
          >
            <ListItemButton>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              Cadastrar Categoria
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => handleMenuClick(`/createbook`)}
          >
            <ListItemButton>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              Cadastrar Livro
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <h6 className="text-center p-2">Painel de Controle</h6>
        <List>
          <ListItem disablePadding onClick={() => handleMenuClick(`/report`)}>
            <ListItemButton>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              Relatórios
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => handleMenuClick(`/configuration`)}
          >
            <ListItemButton>
              <ListItemIcon>
                <SettingsApplicationsIcon />
              </ListItemIcon>
              Configurações
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
