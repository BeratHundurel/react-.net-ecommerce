import { AppBar, Button, FormControlLabel, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    darkMode: boolean;
    handleThemeChange:() => void;
}
export default function Header({darkMode,handleThemeChange}:Props) {
    return (
        <AppBar position="static" sx={{ mb: 5 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News
                </Typography>
                <FormControlLabel
                    control={<Switch checked={darkMode} color="secondary" onChange={handleThemeChange} />}
                    label="Switch Theme"
                />
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}