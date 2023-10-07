import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";


interface Props {
    message?: string;
}
export default function Loading({ message = "Loading..." }) {
    return (
        <Backdrop open={true} invisible={true}>
            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height={"100vh"}>
                <CircularProgress size={100} color="secondary" />
                <Typography variant="h6" sx={{ justifyContent: "center", position: "fixed", top: "60%" }}>{message}</Typography>
            </Box>
        </Backdrop>
    )
}