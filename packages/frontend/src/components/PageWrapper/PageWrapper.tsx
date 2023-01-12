import { Button, Card, CardHeader, Divider, Grid } from "@mui/material";
import React, { PropsWithChildren } from "react";

import { PageWrapperStyles } from "./PageWrapper.Styles";
import { RoutePaths } from "../../util/enum";
import { useAuthContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";

interface PageWrapperProps {
  pageTitle: React.ReactNode;
  showBackButton?: boolean;
}

const PageWrapper: React.FC<PropsWithChildren<PageWrapperProps>> = (
  props: PropsWithChildren<PageWrapperProps>
) => {
  const authContext = useAuthContext();
  const navigate = useNavigate();

  const onClickLogOut = () => {
    authContext.signOut();
  };

  const onClickFavorite = () => {
    navigate(RoutePaths.ProductFavorite, { replace: true });
  };

  const onClickBack = () => {
    navigate(RoutePaths.Product, { replace: true });
  };

  return (
    <PageWrapperStyles>
      <Card className="root" elevation={2}>
        <CardHeader
          action={
            <Grid container spacing={1}>
              <Grid item>
                <Button
                  onClick={props.showBackButton ? onClickBack : onClickFavorite}
                  color="primary"
                  variant="contained"
                >
                  {props.showBackButton ? "Back" : "Go to Favorite"}
                </Button>
              </Grid>

              <Grid item>
                <Button
                  onClick={onClickLogOut}
                  color="primary"
                  variant="contained"
                >
                  LogOut
                </Button>
              </Grid>
            </Grid>
          }
          title={props.pageTitle}
          classes={{
            root: "pageHeader",
            title: "pageTitle",
          }}
        />
        <Divider />
      </Card>

      <div className="wrapper">{props.children}</div>
    </PageWrapperStyles>
  );
};

export default PageWrapper;
