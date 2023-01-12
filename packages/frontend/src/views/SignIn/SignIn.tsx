import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { RoutePaths } from "../../util/enum";
import Shared from "../../util/shared";
import { SignInStyles } from "./SignIn.Styles";
import { useAppContext } from "../../context/app";
import { useAuthContext } from "../../context/auth";
import { useAuthService } from "../../services/auth.service";
import { useNotificationContext } from "../../context/notification";

const SignIn: React.FC = () => {
  const appContext = useAppContext();
  const authContext = useAuthContext();
  const notificationContext = useNotificationContext();
  const authService = useAuthService(authContext.getToken());
  const navigate: NavigateFunction = useNavigate();
  const [username, setUserName] = useState<string>("");
  const [usernameError, setUserNameError] = useState<boolean>(false);
  const handleChangeUserName = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUserName(event.target.value);
    setUserNameError(!event.target.value);
  };

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const handleChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(event.target.value);
    setPasswordError(!event.target.value);
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // add new line if ctrl + enter hit else send message on enter
    if (event.key === "Enter") {
      onClickSignIn();
    }
  };

  const onKeyDownPassword = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      onClickSignIn();
    }
  };

  const onClickSignIn = async (): Promise<void> => {
    if (
      usernameError ||
      passwordError ||
      !username.length ||
      !password.length
    ) {
      setUserNameError(!username.length);
      setPasswordError(!password.length);
      return;
    }

    try {
      appContext.setLoading(true, "sign-in");
      const user = await authService.logIn(username, password);

      authContext.setUser(user);
      navigate(RoutePaths.Product, {
        replace: true,
      });
    } catch (error) {
      if (Shared.isApiError(error)) {
        notificationContext.showMessage({
          message: error.error,
          type: "error",
        });
      }
    } finally {
      appContext.setLoading(false, "sign-in");
    }
  };

  return (
    <SignInStyles>
      <Card elevation={4} className="login">
        <CardContent className="cardContent">
          <Grid item xs={12} className="textCenter">
            <p className="welcomeMessage">
              <strong>Welcome</strong>
            </p>
          </Grid>
          <Grid item xs={12} className="textCenter">
            <img src="/Logo192.png" alt="Practical" className="image" />
          </Grid>

          <Typography className="description">
            Welcome to practical test
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={username}
                onChange={handleChangeUserName}
                variant="outlined"
                label="Email / Login"
                fullWidth
                margin="dense"
                error={usernameError}
                helperText={usernameError && "Please enter valid username"}
                onKeyDown={onKeyDown}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" margin="dense">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleChangePassword}
                  onKeyDown={onKeyDownPassword}
                  error={passwordError}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {passwordError && (
                  <FormHelperText error={passwordError}>
                    Please enter password
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Grid item xs={12} className="googleContainer">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="googleSignIn"
              onClick={() => onClickSignIn()}
              type="submit"
            >
              Login
            </Button>
          </Grid>
          <Link>Forgot your password?</Link>
        </CardContent>
      </Card>
    </SignInStyles>
  );
};

export default SignIn;
