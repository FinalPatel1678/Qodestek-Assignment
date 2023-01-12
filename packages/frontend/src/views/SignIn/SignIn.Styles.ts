import styled from "@emotion/styled";

export const SignInStyles = styled.div({
  ".login": {
    width: "33%",
    height: "fit-content",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 20px 7px rgba($zing - Slate, 0.5)!important",
    borderRadius: "5px",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    padding: "40px 30px 20px 30px",
    "@media (max-width: 600px)": {
      width: "90%",
      marginLeft: "5%",
      marginRight: "5%",
      padding: "15px 10px",
    },
    "@media (max-width: 900px)": {
      width: "70%",
      marginLeft: "15%",
      marginRight: "15%",
    },
    "@media (max-width: 1200px)": {
      width: "60%",
      marginLeft: "20%",
      marginRight: "20%",
    },
  },
  ".cardContent": {
    padding: "0 !important",
  },
  ".welcomeMessage": {
    fontSize: "30px",
    fontWeight: 600,
    lineHeight: "40px",
    textAlign: "center",
    margin: "0 !important",
  },
  ".googleContainer": {
    padding: "30px 0px 0px 0px",
    marginBottom: 10,
  },
  ".image": {
    maxWidth: "80%",
    marginBottom: "30px",
    padding: 5,
  },
  ".googleSignIn": {
    borderRadius: "7px",
    verticalAlign: "middle",
    display: "inline-flex",
    textTransform: "uppercase",
    "@media (max-width: 600px)": {
      fontSize: "15px !important",
    },
  },
  ".textCenter": {
    textAlign: "center",
  },
  ".description": {
    textAlign: "center",
    color: "grey",
    marginBottom: 15,
  },
});
