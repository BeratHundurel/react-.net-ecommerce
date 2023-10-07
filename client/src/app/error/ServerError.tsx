import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ServerError() {
    const { state } = useLocation();
    return (
        <Container component={Paper} sx={{ p: 3, mt: 3 }}>
            {state?.error ? (
                <>
                    <Typography variant="h3" mb={3} color={"secondary"}>{state.error.title}</Typography>
                    <Divider />
                    <Typography variant="body1" color={"primary.dark"}>{state.error.detail || 'Internal Server Error'}</Typography>
                </>
            ) : (
                <Typography>Server Error</Typography>
            )}
            <Typography variant="h5">Server Error</Typography>
        </Container>
    )
}
