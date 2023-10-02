import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, FormControlLabel, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

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
    color: "inherit",
    typography: "h6",
    "&:hover": { color: "grey.500" },
    "&.active": { color: "text.secondary" },
}
export default function Header({ darkMode, handleThemeChange }: Props) {
    return (
        <AppBar position="static" sx={{ mb: 5 }}>
            <Toolbar className="Navbar">
                <Box>
                    <Typography component={NavLink} to="/"
                        sx={{ color: "inherit", typography: "h6", textDecoration: "none" }}
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
                <IconButton size="large" color="inherit">
                        <Badge badgeContent={4} color="secondary">
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