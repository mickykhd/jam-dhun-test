import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Snackbar,
  IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import "./Login.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const URL = "https://stg.dhunjam.in/account/admin/login";
const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [token, setToken] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (data.status === "200") {
        setOpen(true);
      }
      console.log(data);
      console.log(data.data.token);
      setToken(data.data.token);
      setLoading(false);
      if (data.data.token) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);

    // sessionStorage.setItem("token", token);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div className="login-container">
      <p className="login-heading">Venue Admin Login</p>

      <TextField
        sx={{
          color: "white",
          borderColor: "white",
          border: "1px solid white",
          borderRadius: "5px",

          fontFamily: "Poppins",
          width: "25rem",
          marginTop: "2rem",
        }}
        InputProps={{
          style: {
            color: "white",
          },
        }}
        InputLabelProps={{
          style: {
            color: "white",
            fontFamily: "Poppins",
          },
        }}
        id="outlined-basic"
        label="Username"
        size="small"
        name="username"
        value={user.username}
        onChange={handleChange}
      />
      <FormControl sx={{ m: 1, width: "25rem" }} size="small">
        <InputLabel
          sx={{ color: "white", fontFamily: "Poppins" }}
          htmlFor="outlined-adornment-password"
          style={{ color: "white", fontFamily: "Poppins" }}
        >
          Password
        </InputLabel>
        <OutlinedInput
          sx={{
            color: "white",
            borderColor: "white",
            border: "1px solid white",
            borderRadius: "5px",
          }}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                sx={{
                  color: "white",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          inputProps={{
            style: {
              color: "white",
              fontFamily: "Poppins",
            },
          }}
          label="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
      </FormControl>

      <LoadingButton
        sx={{
          fontFamily: "Poppins",
          "&:hover": {
            backgroundColor: "#6741D9",
          },
          height: "5rem",
          ".MuiLoadingButton-loadingIndicator": {
            color: "#FFFFFF",
          },
        }}
        loading={loading}
        onClick={handleUser}
      >
        Sign in
      </LoadingButton>
      <a href="#">New Registartion ?</a>
      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Note archived"
          action={action}
        />
      </div>
    </div>
  );
};

export default Login;
