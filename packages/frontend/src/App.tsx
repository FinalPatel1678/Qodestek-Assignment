import { AppWrapper } from "./context/app";
import { AuthWrapper } from "./context/auth";
import { CssBaseline } from "@mui/material";
import { MainNavigation } from "./components/MainNavigation";
import { NotificationWrapper } from "./context/notification";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <AppWrapper>
        <NotificationWrapper>
          <Router>
            <AuthWrapper>
              <MainNavigation />
            </AuthWrapper>
          </Router>
        </NotificationWrapper>
      </AppWrapper>
    </>
  );
};

export default App;
