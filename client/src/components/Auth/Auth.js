import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import jwt_decode from "jwt-decode";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Icon from "./icon";
import Input from "./Input";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useHistory } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onGoogleSuccess = (props) => {
    const decoded = jwt_decode(props.credential);
    const { name, email, picture, sub } = decoded;
    try {
      dispatch({ type: "AUTH", data: { name, email, picture, sub } });
      history.push("/");
    } catch (err) {}
  };

  const onGoogleFailure = (props) => {
    console.log(props);
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignup((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword(false);
  };

  return (
    <GoogleOAuthProvider clientId="16933374712-28o2c7398nvlcd10c5f4kj23h3e5iofi.apps.googleusercontent.com">
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                  handleShowPassword={handleShowPassword}
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              // render={(renderProps) => (
              //   <Button
              //     className={classes.googleButton}
              //     color="primary"
              //     fullWidth
              //     onClick={renderProps.onClick}
              //     disabled={renderProps.disabled}
              //     startIcon={<Icon />}
              //     variant="contained"
              //   >
              //     Google Sign In
              //   </Button>
              // )}
              onSuccess={onGoogleSuccess}
              onFailure={onGoogleFailure}
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Auth;
