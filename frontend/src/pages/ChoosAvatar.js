import React, { useState, useEffect } from "react";
import {
    Container,
    Card,
    Avatar,
    Typography,
    Box,
    CardActionArea,
    Alert,
    AlertTitle,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import images from "../utils/images";
import { updateUser } from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";
const ChoosAvatar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, data, error } = useSelector((state) => state.updateUser);
    const { data: userData } = useSelector((state) => state.auth);
    const [avatar, setAvatar] = useState(userData.avatar || null);
    const [alert, setAlert] = useState(null);
    const theme = useTheme();

    const updateUserAvatar = (e) => {
        e.preventDefault();
        if (avatar) {
            dispatch(updateUser({ avatar }));
        }
    };

    useEffect(() => {
        if (error) {
            setAlert({ title: "Error", severity: "error", message: error });
            setTimeout(() => {
                setAlert(null);
            }, 3000);
        }
        if (data) {
            setAlert({
                title: "Success",
                severity: "success",
                message: "Your avatar has been updated",
            });
            setTimeout(() => {
                setAlert(null);
                navigate("/chats");
            }, 3000);
        }
    }, [error, data, navigate]);

    return (
        <Container
            sx={{ height: "40vh", width: "40vw" }}
            style={{ boxSizing: "border-box" }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "40px",
                }}
            >
                <Typography variant="h6">Choose your avatar:</Typography>
            </Box>
            {alert && (
                <Alert severity={alert.severity}>
                    {" "}
                    <AlertTitle>{alert.title}</AlertTitle>
                    {alert.message}
                </Alert>
            )}
            <Box className="row">
                {images.map((image, index) => (
                    <Box className="column" key={index}>
                        <Card
                            sx={{
                                height: "150px",
                                width: "150px",
                                bgcolor:
                                    avatar === image
                                        ? theme.palette.secondary.main
                                        : "",
                            }}
                            className="avatar-card"
                        >
                            <CardActionArea
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                    height: "100%",
                                }}
                                className="avatar-card-action"
                                onClick={() => setAvatar(image)}
                            >
                                <Avatar
                                    src={image}
                                    alt="avatar"
                                    sx={{ width: 100, height: 100 }}
                                />
                            </CardActionArea>
                        </Card>
                    </Box>
                ))}
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "40px",
                }}
            >
                <LoadingButton
                    color="secondary"
                    type="submit"
                    loadingPosition="start"
                    loading={loading}
                    variant="contained"
                    startIcon={<CheckCircleIcon />}
                    onSubmit={updateUserAvatar}
                    onClick={updateUserAvatar}
                >
                    Continue
                </LoadingButton>
            </Box>
        </Container>
    );
};

export default ChoosAvatar;
