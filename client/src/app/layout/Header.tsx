import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, FormControlLabel, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

const midLinks = [
    { title: "catalog", path: "/catalog" },
    { title: "about", path: "/about" },
    { title: "contact", path: "/contact" },
]

const rightLinks = [
    { title: "login", path: "/login" },
    { title: "register", path: "/register" },
]
interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}
const navStyles = {
    color: "text.primary",
    typography: "p",
    "&:hover": { color: "primary.dark" },
    "&.active": { color: "secondary.dark" },
    fontSize: "14px",
    fontWeight: "900",
}
export default function Header({ darkMode, handleThemeChange }: Props) {
    const { basket } = useAppSelector((state) => state.basket);
    const itemCount = basket?.items?.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <AppBar position="static" sx={{ boxShadow: "unset" }}>
            <Toolbar className="Navbar">
                <Box>
                    <Typography component={NavLink} to="/"
                        sx={{ color: "inherit", textDecoration: "none" }}
                        variant="h6"
                    >
                        News
                    </Typography>
                    <FormControlLabel
                        control={<Switch checked={darkMode} color="secondary" onChange={handleThemeChange} sx={{ ml: 3 }} />}
                        label="Switch Theme"
                    />
                </Box>
                <Box>
                    <List sx={{ display: "flex" }}>
                        {midLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink} to={path} key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}</List>
                </Box>
                <Box display="flex" alignItems="center">
                    <IconButton size="medium" color="inherit" component={Link} to={"basket"}>
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: "flex" }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink} to={path} key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}</List>
                </Box>
            </Toolbar>
        </AppBar >
    )
}